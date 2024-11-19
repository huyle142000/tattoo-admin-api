import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface ProductCategoryType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual category name
  description: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class ProductCategory {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  name: Languages // Multilingual category name
  description: Languages // Optional multilingual description

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(category: ProductCategoryType) {
    this._id = category._id // Optional ObjectId assignment

    // Category details
    this.name = category.name
    this.description = category.description

    // Timestamps (optional)
    this.createdAt = category.createdAt || new Date()
    this.updatedAt = category.updatedAt || new Date()
  }

  // Getters for category details
  // ... (getters for all category properties)

  // Setters for category details
  // ... (setters for all category properties)

  // Setters for timestamps (not recommended, but can be added if needed)
  // ... (setters for createdAt and updatedAt)
}
