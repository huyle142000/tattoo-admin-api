import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface UnitType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual service name
  description?: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class Unit {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual service name
  description?: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(service: UnitType) {
    this._id = service._id // Optional ObjectId assignment

    // Unit details
    this.name = service.name
    this.description = service.description

    // Timestamps (optional)
    this.createdAt = service.createdAt || new Date()
    this.updatedAt = service.updatedAt || new Date()
  }
}
