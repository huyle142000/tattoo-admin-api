import { ObjectId } from 'mongodb' // Import for using ObjectId if needed
import { AppointmentStatusRequest } from '~/constant/enums'

interface RequestAppointmentType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Client information
  name: string
  phoneNumber: number
  email: string
  image?: string

  //service
  service?: ObjectId

  // user
  user?: ObjectId

  // Appointment details
  date: Date
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatusRequest // Appointment status

  //Price
  totalPrice: number

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class RequestAppointment {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Client information
  name: string
  phoneNumber: number
  email: string
  image?: string

  //service
  service?: ObjectId

  // user
  user?: ObjectId

  // Appointment details
  date: Date
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment

  //Price
  totalPrice: number

  // Status management
  status: AppointmentStatusRequest // Appointment status

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(appointment: RequestAppointmentType) {
    this._id = appointment._id // Optional ObjectId assignment

    // consultant
    this.user = appointment?.user

    // Client information
    this.name = appointment.name
    this.phoneNumber = appointment.phoneNumber
    this.email = appointment.email
    this.image = appointment.image ?? ''

    //service
    this.service = appointment.service

    // Appointment details
    this.startTime = appointment.startTime
    this.endTime = appointment.endTime

    this.date = appointment.date
    this.totalPrice = appointment.totalPrice
    this.note = appointment.note

    // Status management
    this.status = appointment.status || AppointmentStatusRequest.Pending // Default to pending

    // Timestamps (optional)
    this.createdAt = appointment.createdAt || new Date()
    this.updatedAt = appointment.updatedAt || new Date()
  }
}
