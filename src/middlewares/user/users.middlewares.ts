import { Request, Response, NextFunction } from 'express'
import { checkSchema, ParamSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constant/enums'
import { HTTP_STATUS } from '~/constant/https'
import { USER_MESSAGE } from '~/constant/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { TokenPayload } from '~/models/requests/Users.request'
import databaseService from '~/services/database.services'
import userServices from '~/services/user/users.services'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'
import { nameSchema } from '~/middlewares/common.middlewares'

const dateOfBirthSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    }
  }
}

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRING
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  trim: true,
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG
  }
}

const confirmPasswordSchema = (key: string): ParamSchema => {
  return {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 6,
        max: 50
      }
    },
    trim: true,
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    },

    custom: {
      options: (value, { req }) => {
        if (value != req.body[key]) {
          throw new Error('Passwords do not match')
        }
        return true
      }
    }
  }
}

const forgotPasswordTokenSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
  },
  trim: true,

  custom: {
    options: async (value, { req }) => {
      if (!value) {
        throw new ErrorWithStatus({
          message: USER_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      try {
        const decode_forgot_password_token = await verifyToken({
          token: value,
          secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string
        })
        const { user_id } = decode_forgot_password_token
        const user = await databaseService.users.findOne({
          _id: new ObjectId(user_id)
        })
        if (!user) {
          throw new ErrorWithStatus({ message: USER_MESSAGE.USER_NOT_FOUND, status: HTTP_STATUS.UNAUTHORIZED })
        }
        if (user.forgot_password_token !== value) {
          throw new ErrorWithStatus({
            message: USER_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_INVALID,
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }

        ;(req as Request).decode_forgot_password_token = decode_forgot_password_token
      } catch (error) {
        throw new ErrorWithStatus({
          message: capitalize((error as JsonWebTokenError).message),
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }

      return true
    }
  }
}

const followSchema: ParamSchema = {
  custom: {
    options: async (value: string, { req }) => {
      if (!ObjectId.isValid(value)) {
        throw new ErrorWithStatus({
          message: USER_MESSAGE.FOLLOW_USER_IS_INVALID,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      const follower = await databaseService.users.findOne({ followed_user_id: new ObjectId(value) })
      if (!follower) {
        throw new ErrorWithStatus({
          message: USER_MESSAGE.USER_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
    }
  }
}

export const loginValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
      },
      trim: true,
      isEmail: {
        errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
      },
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({ email: value, password: hashPassword(req.body.password) })
          if (!user) {
            throw new ErrorWithStatus({ message: USER_MESSAGE.USER_NOT_FOUND, status: 400 })
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRING
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
      },
      trim: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG
      }
    }
  })
)

export const registerValidator = validate(
  checkSchema({
    name: nameSchema,
    email: {
      notEmpty: {
        errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
      },
      trim: true,
      isEmail: {
        errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const isExisted = await userServices.checkEmailExists(value)
          if (isExisted) {
            throw new ErrorWithStatus({ message: `Email ${value} already exists`, status: 400 })
          }
          return true
        }
      }
    },
    password: passwordSchema,
    confirm_password: confirmPasswordSchema('password'),
    date_of_birth: dateOfBirthSchema
  })
)

export const accessTokenValidator = validate(
  checkSchema({
    Authorization: {
      trim: true,
      custom: {
        options: async (value: string, { req }) => {
          const access_token = (value || '')?.split('Bearer ')[1]
          if (!access_token) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          try {
            const decode_authorization = await verifyToken({
              token: access_token,
              secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
            })
            ;(req as Request).decode_authorization = decode_authorization
          } catch (error) {
            throw new ErrorWithStatus({
              message: capitalize((error as JsonWebTokenError).message),
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }

          return true
        }
      }
    }
  })
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }

            try {
              const [decode_refresh_token, refresh_token] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string }),
                databaseService.refreshTokens.findOne({ token: value })
              ])
              if (!refresh_token) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.REFRESH_TOKEN_IS_NOT_EXISTED,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              ;(req as Request).decode_refresh_token = decode_refresh_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.REFRESH_TOKEN_IS_INVALID,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }

              throw error
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyEmailTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              const decode_email_verify_token = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })
              ;(req as Request).decode_email_verify_token = decode_email_verify_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
      },
      trim: true,
      isEmail: {
        errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
      },
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({ email: value })
          if (!user) {
            throw new ErrorWithStatus({ message: USER_MESSAGE.USER_NOT_FOUND, status: 400 })
          }
          req.user = user
          return true
        }
      }
    }
  })
)

export const verifyForgotPasswordTokenValidator = validate(
  checkSchema({
    forgot_password_token: forgotPasswordTokenSchema
  })
)

export const ressetPasswordValidator = validate(
  checkSchema({
    password: passwordSchema,
    confirm_password: confirmPasswordSchema('password'),
    forgot_password_token: forgotPasswordTokenSchema
  })
)

export const changePasswordValidator = validate(
  checkSchema({
    old_password: {
      ...passwordSchema,
      custom: {
        options: async (value: string, { req }) => {
          const { user_id } = req.decode_authorization as TokenPayload
          const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
          if (!user) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.USER_NOT_FOUND,
              status: HTTP_STATUS.NOT_FOUND
            })
          }
          const { password } = user
          const isMatch = hashPassword(value) === password
          if (!isMatch) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.OLD_PASSWORD_IS_WRONG,
              status: HTTP_STATUS.NOT_FOUND
            })
          }
          const follower = await databaseService.users.findOne({ followed_user_id: new ObjectId(value) })
          if (!follower) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.USER_NOT_FOUND,
              status: HTTP_STATUS.NOT_FOUND
            })
          }
        }
      }
    },
    new_password: confirmPasswordSchema('new_password'),
    confirm_new_password: passwordSchema
  })
)

export const verifiedUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const { verify } = req.decode_authorization as TokenPayload
  if (verify !== UserVerifyStatus.Verified) {
    return next(
      new ErrorWithStatus({
        message: USER_MESSAGE.USER_NOT_VERIFIED,
        status: HTTP_STATUS.FORBIDDEN
      })
    )
  }
  next()
}

export const followUserValidator = validate(
  checkSchema({
    followed_user_id: followSchema
  })
)

export const unFollowUserValidator = validate(
  checkSchema(
    {
      user_id: followSchema
    },
    ['params']
  )
)

export const updateMeValidator = validate(
  checkSchema({
    name: {
      ...nameSchema,
      optional: true,
      notEmpty: undefined
    },
    date_of_birth: {
      ...dateOfBirthSchema,
      optional: true
    },
    username: {
      optional: true,
      isString: {
        errorMessage: USER_MESSAGE.USERNAME_MUST_BE_STRING
      },
      custom: {
        options: async (value, { req }) => {
          // Kiểm tra username không phải là số
          if (!isNaN(value)) {
            throw new Error('Username must not be a number')
          }
          // Kiểm tra username là chữ Latin
          if (!/^[a-zA-Z]+$/.test(value)) {
            throw new Error('Username must contain only Latin letters')
          }
          const user = await databaseService.users.findOne({ username: value })
          if (user) {
            throw new Error('Username already exists')
          }
          // Kiểm tra username không tồn tại trong cơ sở dữ liệu (nếu được cung cấp)
          // Thực hiện kiểm tra trong cơ sở dữ liệu ở đây
        }
      }
    },

    location: {
      optional: true,
      isString: {
        errorMessage: USER_MESSAGE.LOCATION_MUST_BE_STRING
      },
      trim: true
    },

    avatar: {
      optional: true,
      isString: {
        errorMessage: USER_MESSAGE.AVATAR_MUST_BE_STRING
      },
      trim: true
    }
  })
)
