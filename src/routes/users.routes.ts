import { Router } from 'express'
import {
  changePasswordController,
  emailController,
  forgotPasswordController,
  getUsersController,
  loginUserController,
  logoutUserController,
  registerUserController,
  resendVerifyEmailController,
  ressetPasswordController,
  updateMeController,
  verifyForgotPasswordController
} from '~/controllers/user/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  ressetPasswordValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyEmailTokenValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/user/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const usersRouter = Router()
usersRouter.get('', wrapRequestHandler(getUsersController))

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginUserController))

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerUserController))

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutUserController))

usersRouter.post('/verify-email', verifyEmailTokenValidator, wrapRequestHandler(emailController))
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

// forgot-password =>
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

usersRouter.post('/resset-password', ressetPasswordValidator, wrapRequestHandler(ressetPasswordController))

usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

// Update
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware(['name', 'username', 'location', 'date_of_birth', 'avatar']),
  wrapRequestHandler(updateMeController)
)

usersRouter.patch('/permission', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(updateMeController))

export default usersRouter
