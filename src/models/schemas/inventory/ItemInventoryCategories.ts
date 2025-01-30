import { ObjectId } from 'mongodb'

interface InventoryCtgsType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Category details
  name: string // Multilingual category name
  description: string // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class InventoryCtgs {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: string // Multilingual category name
  description: string // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(category: InventoryCtgsType) {
    this._id = category._id // Optional ObjectId assignment

    // Category details
    this.name = category.name
    this.description = category.description

    // Timestamps (optional)
    this.createdAt = category.createdAt || new Date()
    this.updatedAt = category.updatedAt || new Date()
  }
}
