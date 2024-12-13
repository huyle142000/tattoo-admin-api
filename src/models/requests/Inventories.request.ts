import { ObjectId } from 'mongodb'

export interface PostInventoriesRequest {
  name: string
  description: string
  categoryId: string
  cost: number
  quantityInStock: number
  reorderLevel: number
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdateInventoriesRequest extends PostInventoriesRequest {
  name: string
  description: string
  categoryId: string
  cost: number
  quantityInStock: number
  reorderLevel: number
  createdAt?: Date
  updatedAt?: Date
}

export interface GetInventoriesRequest {
  _id: ObjectId
  name: string
  categoryId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PostInventoryCtgsRequest {
  name: string
  description: string
}

export interface UpdateInventoryCtgsRequest extends PostInventoryCtgsRequest {
  name: string
  description: string
}

export interface GetInventoryCtgsRequest {
  _id: ObjectId
  name: string
}
