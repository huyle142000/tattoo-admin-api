import { ObjectId } from 'mongodb' // Import for using ObjectId if needed
import { Languages } from '~/constant/common'
import { TattooSize } from '~/constant/enums'

interface TattooType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Core information
  name: Languages // Multilingual name
  description?: Languages // Multilingual description
  price: number
  images?: string[] // Array of image URLs
  completionTime: number // Estimated completion time in minutes or hours

  // Additional details (optional)
  size: TattooSize // small, medium, large
  bodyPart: ObjectId // Body part for placement (e.g., arm, leg, back)

  artist?: ObjectId[] | undefined // Artist name (optional)

  // Get completed image of cliens
  client?: ObjectId[] // Artist name (optional)
  isActive?: boolean // Flag for availability (active or inactive)

  // Relationships (optional for future expansion)
  category: ObjectId // Reference to a category document (e.g., for filtering)

  // Link Embedded Facebook
  linkFb?: string

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class Tattoo {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Core information
  name: Languages // Multilingual name
  description?: Languages // Multilingual description
  price: number
  images?: string[] // Array of image URLs
  completionTime: number // Estimated completion time in minutes or hours

  // Additional details (optional)
  size: TattooSize // small, medium, large
  bodyPart: ObjectId // Body part for placement (e.g., arm, leg, back)
  artist?: ObjectId[] | undefined // Artist name (optional)
  client?: ObjectId[] // Artist name (optional)

  isActive?: boolean // Flag for availability (active or inactive)

  // Relationships (optional for future expansion)
  category: ObjectId // Reference to a category document (e.g., for filtering)

  // Link Embedded Facebook
  linkFb?: string

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
  constructor(tattoo: TattooType) {
    this._id = tattoo._id // Optional ObjectId assignment

    // Core information
    this.name = tattoo.name
    this.description = tattoo.description
    this.price = tattoo.price
    this.images = tattoo.images || [] // Default empty array for images
    this.completionTime = tattoo.completionTime

    // Additional details (optional)
    this.size = tattoo.size
    this.bodyPart = tattoo.bodyPart
    this.artist = tattoo.artist
    this.client = tattoo.client

    this.isActive = tattoo.isActive ?? true // Default to active

    // Relationships (optional)
    this.category = tattoo.category

    //
    this.linkFb = tattoo?.linkFb

    // Timestamps (optional)
    this.createdAt = tattoo.createdAt || new Date()
    this.updatedAt = tattoo.updatedAt || new Date()
  }
}
