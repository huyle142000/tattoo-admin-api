import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface InventoryCategoryType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Category details
  name: Languages // Multilingual category name
  description: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class InventoryCategory {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual category name
  description: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(category: InventoryCategoryType) {
    this._id = category._id // Optional ObjectId assignment

    // Category details
    this.name = category.name
    this.description = category.description

    // Timestamps (optional)
    this.createdAt = category.createdAt || new Date()
    this.updatedAt = category.updatedAt || new Date()
  }
}
