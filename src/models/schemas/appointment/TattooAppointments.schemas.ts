import { ObjectId } from 'mongodb' // Import for using ObjectId if needed
import { AppointmentStatus } from '~/constant/enums'

interface TattooAppointmentType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // consultant
  executor?: ObjectId

  // Client information
  client: ObjectId // Reference to the client's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  // Appointment details
  artist: ObjectId // Reference to the artist's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  // Service
  service: string

  // Time to do (ARRAY)
  session?: ObjectId[]

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class TattooAppointment {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // consultant
  executor?: ObjectId

  // Client information
  client: ObjectId // Reference to the client's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  // Appointment details
  artist: ObjectId // Reference to the artist's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  // Service
  service: string

  // Time to do (ARRAY)
  session?: ObjectId[]

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(appointment: TattooAppointmentType) {
    this._id = appointment._id // Optional ObjectId assignment

    // consultant or artist
    this.executor = appointment?.executor

    // Client information
    this.client = appointment.client

    // Tattoo information
    this.tattoo = appointment.tattoo

    // Appointment details
    this.artist = appointment.artist
    this.note = appointment.note

    // Status management
    this.status = appointment.status

    // Time to do (ARRAY)
    this.session = appointment.session

    // Service
    this.service = appointment.service

    // Timestamps (optional)
    this.createdAt = appointment.createdAt || new Date()
    this.updatedAt = appointment.updatedAt || new Date()
  }
}
