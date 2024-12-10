import nodemailer from 'nodemailer'
import User from '~/models/schemas/user/Users.schemas'
import { RegisterRequest, UpdateMeRequest } from '~/models/requests/Users.request'
import { hashPassword } from '~/utils/crypto'
import { signToken, verifyToken } from '~/utils/jwt'
import { TokenType, UserRoles, UserVerifyStatus } from '~/constant/enums'
import RefreshToken from '~/models/schemas/refreshToken/RefreshToken.schemas'
import { ObjectId } from 'mongodb'
import { USER_MESSAGE } from '~/constant/messages'
import dotenv from 'dotenv'
import databaseService from '../database.services'
dotenv.config()

class UsersService {
  private signAccessToken({ user_id, verify, role }: { user_id: string; verify: UserVerifyStatus; role?: UserRoles }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify,
        role: role ?? UserRoles.Client
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken({
    user_id,
    verify,
    role
  }: {
    user_id: string
    verify: UserVerifyStatus
    role?: UserRoles
  }) {
    return Promise.all([
      this.signAccessToken({
        user_id,
        verify: verify ?? UserVerifyStatus.Unverified,
        role: role ?? UserRoles.Client
      }),
      this.signRefreshToken({
        user_id,
        verify: verify ?? UserVerifyStatus.Unverified,
        role: role ?? UserRoles.Client
      })
    ])
  }

  private signRefreshToken({
    user_id,
    verify,
    exp,
    role
  }: {
    user_id: string
    verify: UserVerifyStatus
    exp?: number
    role?: UserRoles
  }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp,
          role: role ?? UserRoles.Client
        },
        privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,

        options: {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,

      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: verify
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,

      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,

      options: {
        expiresIn: process.env.PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }

  async register(payload: RegisterRequest) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })

    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password),
        email_verify_token,
        role: UserRoles.Client
      })
    )

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async refreshToken({
    user_id,
    verify,
    refresh_token,
    exp
  }: {
    user_id: string
    verify: UserVerifyStatus
    refresh_token: string
    exp: number
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, verify }),
      this.signRefreshToken({ user_id, verify, exp }),
      databaseService.refreshTokens.deleteOne({ token: refresh_token })
    ])

    return {
      new_access_token,
      new_refresh_token
    }
  }

  async checkEmailExists(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async login({ user_id, verify, role }: { user_id: string; verify: UserVerifyStatus; role?: UserRoles }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id,
      verify,
      role: role ?? UserRoles.Client
    })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async logout(refresh_token: string) {
    console.log(refresh_token)
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USER_MESSAGE.LOGOUT_SUCCESSFULLY
    }
  }

  async verifyEmail(user_id: string) {
    const [token] = await Promise.all([
      this.signAccessAndRefreshToken({
        user_id: user_id.toString(),
        verify: UserVerifyStatus.Verified
      }),
      databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
        {
          $set: {
            email_verify_token: '',
            update_at: '$$NOW',
            verify: UserVerifyStatus.Verified
          }
        }
      ])
    ])

    const [access_token, refresh_token] = token

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async resendVerifyEmail(user_id: string) {
    const email_verify_token = await this.signEmailVerifyToken({
      user_id,
      verify: UserVerifyStatus.Unverified
    })

    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          email_verify_token,
          update_at: '$$NOW'
        }
      }
    ])
    return {
      message: USER_MESSAGE.RESEND_EMAIL_VERIFIED_SUCCESS
    }
  }

  async forgotPassword({
    user_id,
    verify,
    domain,
    emailReceiver
  }: {
    user_id: string
    verify: UserVerifyStatus
    domain: string
    emailReceiver: string
  }) {
    const forgot_password_token = await this.signForgotPasswordToken({
      user_id,
      verify
    })
    const result = await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          forgot_password_token,
          update_at: '$$NOW'
        }
      }
    ])
    // Gửi email kèm đường link đến email người dùng
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.EMAIL_SENDER, // Thay thế bằng email của bạn
        pass: process.env.PASS_EMAIL_SENDER // Thay thế bằng mật khẩu email của bạn
      }
    })
    console.log('forgotPassword :::')

    const mailOptions: any = {
      from: 'Tên Của Bạn <huylep14@gmail.com>', // Thay thế bằng tên và email của bạn
      to: emailReceiver,
      subject: 'Xác nhận tài khoản',
      html: `
        <p>Chào bạn,</p>
        <p>Vui lòng nhấp vào liên kết sau để xác nhận tài khoản của bạn:</p>
        <form action="${domain}/verify-forgot-password" method="POST">
          <input type="hidden" name="token" value="${forgot_password_token}">
          <button type="submit">Xác nhận tài khoản</button>
        </form>
        <p>Lưu ý: Liên kết này chỉ có hiệu lực trong 24 giờ và khi chưa thay đổi mật khẩu.</p>
      `
    }

    // Gửi email
    try {
      await transporter.sendMail(mailOptions).then(() => {
        transporter.close()
      })
    } catch (error: any) {
      console.log('error :::', error?.message)
    }

    return {
      message: USER_MESSAGE.RESEND_EMAIL_VERIFIED_SUCCESS
    }
  }

  async resetPassword(user_id: string, password: string) {
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          forgot_password_token: '',
          password: hashPassword(password),
          update_at: '$$NOW'
        }
      }
    ])
    // Gửi email kèm đường link đến email người dùng

    return {
      message: USER_MESSAGE.RESSET_PASSWORD_SUCCESSFULLY
    }
  }

  async changePassword(user_id: string, new_password: string) {
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          password: hashPassword(new_password),
          update_at: '$$NOW'
        }
      }
    ])
    // Gửi email kèm đường link đến email người dùng

    return {
      message: USER_MESSAGE.RESSET_PASSWORD_SUCCESSFULLY
    }
  }

  async getMe(user_id: string) {
    const user = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }
  async getUsers() {
    const user = await databaseService.users.find({}).toArray()
    console.log(user, 'user')
    return user
  }

  async updateMe(user_id: string, payload: UpdateMeRequest) {
    const user = await databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          payload
        },
        $currentDate: {
          update_at: true
        }
      },
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }
}

const userServices = new UsersService()
export default userServices
