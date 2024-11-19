import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  create_at?: Date
  user_id: ObjectId
  iat: number
  exp: number
}

export default class RefreshToken {
  _id?: ObjectId
  token: string
  create_at: Date
  user_id: ObjectId
  iat: Date
  exp: Date

  constructor(user: RefreshTokenType) {
    this._id = user._id
    this.user_id = user.user_id || ''
    this.token = user.token
    this.create_at = user.create_at || new Date()
    this.iat = new Date(user.iat * 1000)
    this.exp = new Date(user.exp * 1000)
  }
}
