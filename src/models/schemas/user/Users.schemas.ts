import { ObjectId } from 'mongodb'
import { UserRoles, UserVerifyStatus } from '~/constant/enums'

interface UserType {
  _id?: ObjectId
  name?: string
  email: string
  date_of_birth?: Date
  password: string
  create_at?: Date
  update_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  role?: UserRoles
  location?: string
  username?: string
  avatar?: string
  order?: string[]
  appointment?: string[]
  completedTattooImage?: string[]
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  create_at: Date
  update_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  role: UserRoles
  location: string
  username: string
  avatar: string
  order?: string[]
  appointment?: string[]
  completedTattooImage?: string[]

  constructor(user: UserType) {
    this._id = user._id
    this.name = user.name || ''
    this.email = user.email
    this.password = user.password || ''
    this.create_at = user.create_at || new Date()
    this.update_at = user.update_at || new Date()
    this.email_verify_token = user.email_verify_token || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.forgot_password_token = user.forgot_password_token ?? ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.role = user.role || UserRoles.Client
    this.location = user.location || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''

    this.order = user?.order
    this.appointment = user?.appointment
    this.completedTattooImage = user?.completedTattooImage
  }
}
