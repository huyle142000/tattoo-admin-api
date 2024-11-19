import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'
import { DesInc, TattooSize } from '~/constant/enums'

export interface TattoosQueryRequest {
  _id?: ObjectId
  price?: DesInc
  name: any
  size?: TattooSize
  bodyPart?: ObjectId
  artist?: ObjectId[]
  client?: ObjectId[]
  category?: ObjectId
}

export interface PostTattoosRequest {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Core information
  name: Languages // Multilingual name
  description?: Languages // Multilingual description
  price: number
  images?: string[] // Array of image URLs
  completionTime: number // Estimated completion time in minutes or hours

  // Additional details (optional)
  style: string // Tattoo style (e.g., realism, blackwork, etc.)
  size: TattooSize // small, medium, large
  bodyPart: ObjectId // Body part for placement (e.g., arm, leg, back)
  artist?: ObjectId[]
  client?: ObjectId[]
  isActive?: boolean // Flag for availability (active or inactive)

  // Relationships (optional for future expansion)
  category: ObjectId // Reference to a category document (e.g., for filtering)

  // Link Embedded Facebook
  linkFb?: string
}

export interface TattooCategoriesRequest {
  name?: Languages
  description?: Languages
  _id?: ObjectId
}

export interface PostTattooCategoriesRequest {
  name: Languages
  description: Languages
}
