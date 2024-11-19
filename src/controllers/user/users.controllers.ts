import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutReqBody,
  RegisterRequest,
  RessetPasswordRequest,
  TokenPayload,
  UpdateMeRequest,
  VerifyEmailRequest,
  VerifyForgotPasswordRequest
} from '~/models/requests/Users.request'
import userServices from '~/services/user/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { NextFunction, Request, Response } from 'express'
import { UserVerifyStatus } from '~/constant/enums'
import User from '~/models/schemas/user/Users.schemas'
import { COMMON_MESSAGE, USER_MESSAGE } from '~/constant/messages'
import databaseService from '~/services/database.services'
import { HTTP_STATUS } from '~/constant/https'

export const loginUserController = async (req: Request<ParamsDictionary, any, LoginRequest>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId

  const result = await userServices.login({
    user_id: user_id.toString(),
    verify: UserVerifyStatus.Verified,
    role: user.role
  })
  return res.send({
    message: USER_MESSAGE.LOGIN_SUCCESSFULLY,
    result
  })
}

export const registerUserController = async (req: Request<ParamsDictionary, any, RegisterRequest>, res: Response) => {
  const result = await userServices.register(req.body)
  return res.send({
    message: 'Successfully registered',
    result
  })
}

export const logoutUserController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await userServices.logout(refresh_token)
  return res.send({
    message: USER_MESSAGE.LOGOUT_SUCCESSFULLY,
    result
  })
}

export const emailController = async (req: Request<ParamsDictionary, any, VerifyEmailRequest>, res: Response) => {
  const user_id = req?.decode_email_verify_token?.user_id as string
  const user = await databaseService.users.findOne({ user_id })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USER_MESSAGE.USER_NOT_FOUND
    })
  }
  if (user.email_verify_token === '') {
    return res.status(HTTP_STATUS.OK).json({
      message: USER_MESSAGE.EMAIL_ALREADY_VERIFIED
    })
  }
  const result = await userServices.verifyEmail(user_id)
  return res.send({
    message: USER_MESSAGE.EMAIL_VERIFIED_SUCCESS,
    result
  })
}

export const resendVerifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailRequest>,
  res: Response
) => {
  const user_id = req.decode_authorization?.user_id as string
  const user = await databaseService.users.findOne({ user_id })
  if (user && user.email_verify_token === '') {
    return res.status(HTTP_STATUS.OK).json({
      message: USER_MESSAGE.EMAIL_ALREADY_VERIFIED
    })
  }
  const result = await userServices.resendVerifyEmail(user_id)
  return res.send({
    message: USER_MESSAGE.RESEND_EMAIL_VERIFIED_SUCCESS,
    result
  })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordRequest>,
  res: Response
) => {
  const { _id, verify, email } = req.user as User
  const domain = req.headers.host

  const result = await userServices.forgotPassword({
    user_id: (_id as ObjectId)?.toString(),
    verify: verify,
    domain: domain as string,
    emailReceiver: email
  })

  return res.json({
    result
  })
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordRequest>,
  res: Response
) => {
  return res.json({
    message: USER_MESSAGE.VERIFY_FORGOT_PASSWORD_SUCCESSFULLY
  })
}

export const ressetPasswordController = async (
  req: Request<ParamsDictionary, any, RessetPasswordRequest>,
  res: Response
) => {
  const { user_id } = req.decode_forgot_password_token as TokenPayload

  const { password } = req.body
  const result = await userServices.resetPassword(user_id, password)

  return res.json({
    result
  })
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordRequest>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const { new_password } = req.body
  const result = await userServices.changePassword(user_id, new_password)

  return res.json({
    result
  })
}

// UPDATE USER
export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.decode_authorization as TokenPayload
    const body = req.body

    const user = await userServices.updateMe(user_id, body)

    return res.json({
      user,
      message: USER_MESSAGE.UPDATE_PROFILE_SUCCESS
    })
  } catch (error) {
    next(error)
  }
}

// Get USERs
export const getUsersController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await userServices.getUsers()
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}
