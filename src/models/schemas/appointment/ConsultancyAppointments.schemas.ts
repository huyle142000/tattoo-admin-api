import { ObjectId } from 'mongodb' // Import for using ObjectId if needed
import { AppointmentStatus } from '~/constant/enums'

interface ConsultancyAppointmentType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // executor
  executor?: ObjectId

  // Client information
  customer: ObjectId // Reference to the customer's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  //service
  service?: ObjectId

  // Appointment details
  artist: ObjectId // Reference to the artist's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  // Time to do (ARRAY)
  session?: ObjectId[]

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class ConsultancyAppointment {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // executor
  executor?: ObjectId

  // Client information
  customer: ObjectId // Reference to the customer's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  //service
  service?: ObjectId

  // Appointment details
  artist: ObjectId // Reference to the artist's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  // Time to do (ARRAY)
  session?: ObjectId[]

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(appointment: ConsultancyAppointmentType) {
    this._id = appointment._id // Optional ObjectId assignment

    // executor
    this.executor = appointment?.executor

    // Client information
    this.customer = appointment.customer

    // Tattoo information
    this.tattoo = appointment.tattoo

    //service
    this.service = appointment.service

    // Appointment details
    this.artist = appointment.artist
    this.note = appointment.note

    // Status management
    this.status = appointment.status || AppointmentStatus.Confirmed

    // Time to do (ARRAY)
    this.session = appointment.session

    // Timestamps (optional)
    this.createdAt = appointment.createdAt || new Date()
    this.updatedAt = appointment.updatedAt || new Date()
  }
}
