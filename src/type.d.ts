import { Request } from 'express'

import User from './models/schemas/user/Users.schemas'
import { TokenPayload } from './models/requests/Users.request'

declare module 'express' {
  interface Request {
    user?: User
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
    decode_email_verify_token?: TokenPayload
    decode_forgot_password_token?: TokenPayload
  }
}
