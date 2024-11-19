import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

interface ProductType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Product details
  product: ObjectId // Unique identifier for the product
  name: Languages // Multilingual product name
  description: Languages // Multilingual product description
  productCategory: string // Category of the product
  productCost: number // Cost per unit of the product (purchase price)
  salePrice: number // Price per unit of the product (sale price)
  quantityInStock: number // Current quantity in stock
  reorderLevel: number // Reorder threshold when stock falls below this level
  productImage?: string // Optional product image URL or path
  productActive: boolean // Flag indicating if the product is active for sale
  unit: ObjectId

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class Product {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Product details
  product: ObjectId // Unique identifier for the product
  name: Languages // Multilingual product name
  description: Languages // Multilingual product description
  productCategory: string // Category of the product
  productCost: number // Cost per unit of the product (purchase price)
  salePrice: number // Price per unit of the product (sale price)
  quantityInStock: number // Current quantity in stock
  reorderLevel: number // Reorder threshold when stock falls below this level
  productImage?: string // Optional product image URL or path
  productActive: boolean // Flag indicating if the product is active for sale

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(product: ProductType) {
    this._id = product._id // Optional ObjectId assignment

    // Product details
    this.product = product.product
    this.name = product.name
    this.description = product.description
    this.productCategory = product.productCategory
    this.productCost = product.productCost
    this.salePrice = product.salePrice
    this.quantityInStock = product.quantityInStock
    this.reorderLevel = product.reorderLevel
    this.productImage = product.productImage
    this.productActive = product.productActive

    // Timestamps (optional)
    this.createdAt = product.createdAt || new Date()
    this.updatedAt = product.updatedAt || new Date()
  }

  // Getters for product details
  // ... (getters for all product properties)

  // Setters for product details
  // ... (setters for all product properties)

  // Setters for timestamps (not recommended, but can be added if needed)
  // ... (setters for createdAt and updatedAt)
}
