import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface TattooCategoryType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Category details
  name: Languages // Multilingual category name
  description?: Languages // Multilingual category description

  // Relationships (optional)
  parentCategoryId?: ObjectId // Reference to a parent category (for hierarchical categorization)

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class TattooCategory {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Category details
  name: Languages // Multilingual category name
  description?: Languages // Multilingual category description

  // Relationships (optional)
  parentCategoryId?: ObjectId // Reference to a parent category (for hierarchical categorization)

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(category: TattooCategoryType) {
    this._id = category._id // Optional ObjectId assignment

    // Category details
    this.name = category.name
    this.description = category.description ?? { vi: '', en: '' }

    // Relationships (optional)
    this.parentCategoryId = category.parentCategoryId

    // Timestamps (optional)
    this.createdAt = category.createdAt || new Date()
    this.updatedAt = category.updatedAt || new Date()
  }
}
