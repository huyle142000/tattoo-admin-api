import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface InventoryItemType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Item details
  item: ObjectId // Unique identifier for the inventory item
  name: Languages // Multilingual item name
  description: Languages // Optional multilingual description
  itemCategory: string // Category of the item (e.g., 'Tattoo Ink', 'Supplies')
  itemCost: number // Cost per unit of the item (purchase price)
  salePrice: number // Price per unit of the item (sale price)
  quantityInStock: number // Current quantity in stock
  reorderLevel: number // Reorder threshold when stock falls below this level

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class InventoryItem {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Item details
  item: ObjectId // Unique identifier for the inventory item
  name: Languages // Multilingual item name
  description: Languages // Optional multilingual description
  itemCategory: string // Category of the item (e.g., 'Tattoo Ink', 'Supplies')
  itemCost: number // Cost per unit of the item (purchase price)
  salePrice: number // Price per unit of the item (sale price)
  quantityInStock: number // Current quantity in stock
  reorderLevel: number // Reorder threshold when stock falls below this level

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(item: InventoryItemType) {
    this._id = item._id // Optional ObjectId assignment

    // Item details
    this.item = item.item
    this.name = item.name
    this.description = item.description
    this.itemCategory = item.itemCategory
    this.itemCost = item.itemCost
    this.salePrice = item.salePrice
    this.quantityInStock = item.quantityInStock
    this.reorderLevel = item.reorderLevel

    // Timestamps (optional)
    this.createdAt = item.createdAt || new Date()
    this.updatedAt = item.updatedAt || new Date()
  }
}
