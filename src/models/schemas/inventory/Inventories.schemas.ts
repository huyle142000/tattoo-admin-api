import { ObjectId } from 'mongodb'

interface InventoriesType {
  _id?: ObjectId

  name: string
  description: string
  categoryId: string
  cost: number
  quantityInStock: number
  reorderLevel: number
  createdAt?: Date
  updatedAt?: Date
}

export default class Inventories {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Item details
  name: string // Multilingual item name
  description: string // Optional multilingual description
  categoryId: string // Category of the item (e.g., 'Tattoo Ink', 'Supplies')
  cost: number // Cost per unit of the item (purchase price)
  quantityInStock: number // Current quantity in stock
  reorderLevel: number // Reorder threshold when stock falls below this level

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(item: InventoriesType) {
    this._id = item._id // Optional ObjectId assignment

    // Item details
    this.name = item.name
    this.description = item.description
    this.categoryId = item.categoryId
    this.cost = item.cost
    this.quantityInStock = item.quantityInStock
    this.reorderLevel = item.reorderLevel

    // Timestamps (optional)
    this.createdAt = item.createdAt || new Date()
    this.updatedAt = item.updatedAt || new Date()
  }
}
