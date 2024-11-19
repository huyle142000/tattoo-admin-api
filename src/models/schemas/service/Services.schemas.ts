import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface ServiceType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual service name
  description?: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class Service {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual service name
  description?: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(service: ServiceType) {
    this._id = service._id // Optional ObjectId assignment

    // Service details
    this.name = service.name
    this.description = service.description

    // Timestamps (optional)
    this.createdAt = service.createdAt || new Date()
    this.updatedAt = service.updatedAt || new Date()
  }
}
