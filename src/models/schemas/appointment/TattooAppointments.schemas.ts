import { ObjectId } from 'mongodb' // Import for using ObjectId if needed
import { AppointmentStatus } from '~/constant/enums'

interface TattooAppointmentType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  email: string
  phoneNumber: number
  startTime: string
  endTime: string
  isAllDay: boolean
  date: string

  // consultant
  executor?: ObjectId

  // Client information
  customerId?: ObjectId // Reference to the customerId's document

  // Tattoo information
  tattooId: ObjectId // Reference to the tattooId's document

  // Appointment details
  artistId: ObjectId // Reference to the artistId's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  // Service
  service?: string

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class TattooAppointment {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // consultant
  executor?: ObjectId

  // Client information
  customerId?: ObjectId // Reference to the customerId's document

  // Tattoo information
  tattooId: ObjectId // Reference to the tattooId's document

  // Appointment details
  artistId: ObjectId // Reference to the artistId's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  email: string
  phoneNumber: number
  startTime: string
  endTime: string
  isAllDay: boolean
  date: string

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(appointment: TattooAppointmentType) {
    this._id = appointment._id // Optional ObjectId assignment

    // consultant or artistId
    this.executor = appointment?.executor

    // Client information
    this.customerId = appointment.customerId

    // Tattoo information
    this.tattooId = appointment.tattooId

    // Appointment details
    this.artistId = appointment.artistId
    this.note = appointment.note

    // Status management
    this.status = appointment.status

    this.email = appointment?.email
    this.phoneNumber = appointment?.phoneNumber
    this.startTime = appointment?.startTime
    this.endTime = appointment?.endTime
    this.isAllDay = appointment?.isAllDay
    this.date = appointment?.date
    // Timestamps (optional)
    this.createdAt = appointment.createdAt || new Date()
    this.updatedAt = appointment.updatedAt || new Date()
  }
}
