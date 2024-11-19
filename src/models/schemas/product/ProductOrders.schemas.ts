import { ObjectId } from 'mongodb'
import { OrderStatus, PaymentMethod, ShipMethod } from '~/constant/enums'

interface OrderType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Order details
  customer: ObjectId // Reference to the customer placing the order
  date: Date // Date when the order was placed
  product: { _id: ObjectId; quantity: number }[] // Array of order items
  orderStatus: OrderStatus // Current status of the order (e.g., 'Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled')
  shippingAddress: string

  shippingMethod: ShipMethod // Shipping method chosen by the customer
  shippingCost?: number // Cost of shipping
  totalAmount: number // Total amount of the order (including product costs and shipping)
  paymentMethod: PaymentMethod
  note?: string // Optional note about the order

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class Order {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Order details
  customer: ObjectId // Reference to the customer placing the order
  date: Date // Date when the order was placed
  product: { _id: ObjectId; quantity: number }[] // Array of order items
  orderStatus: OrderStatus // Current status of the order (e.g., 'Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled')
  shippingAddress: string

  shippingMethod: ShipMethod // Shipping method chosen by the customer
  shippingCost?: number // Cost of shipping
  totalAmount?: number // Total amount of the order (including product costs and shipping)
  paymentMethod: PaymentMethod
  note?: string // Optional note about the order

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(order: OrderType) {
    this._id = order._id // Optional ObjectId assignment

    // Order details
    this.customer = order.customer
    this.date = order.date
    this.product = order.product
    this.orderStatus = order.orderStatus
    this.shippingAddress = order.shippingAddress
    this.shippingMethod = order.shippingMethod
    this.shippingCost = order?.shippingCost || 0
    this.totalAmount = order.totalAmount
    this.paymentMethod = order.paymentMethod || PaymentMethod.Cash
    this.note = order.note

    // Timestamps (optional)
    this.createdAt = order.createdAt || new Date()
    this.updatedAt = order.updatedAt || new Date()
  }

  // ... (other methods for the Order class)
}
