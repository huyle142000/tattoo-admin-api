import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserRoles, UserVerifyStatus } from '~/constant/enums'

export interface LoginRequest {
  email: string
  password: string
}

export interface VerifyEmailRequest {
  email_verify_token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface UpdateMeRequest {
  name?: string
  username?: string
  location?: string
  website?: string
  date_of_birth?: string
  avatar?: string
}

export interface UpdateMeRequest {
  role: UserRoles
}

export interface FollowRequest {
  follow_user_id: string
}

export interface UnFollowRequest {
  user_id: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyForgotPasswordRequest {
  forgot_password_token: string
}

export interface RessetPasswordRequest {
  password: string
  confirm_password: string
  forgot_password_token: string
}
export interface ChangePasswordRequest {
  new_password: string
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  role: UserRoles
  exp: number
  iat: number
}
