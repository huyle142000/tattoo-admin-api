import { ObjectId } from 'mongodb'
import { AppointmentStatus, AppointmentTattooStatus, SessionStatus } from '~/constant/enums'

// request-appointment
export interface RequestAppointmentsRequest {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Client information
  name: string
  phoneNumber: number
  email: string
  image?: string
  service?: ObjectId

  // Appointment details
  date: Date
  totalPrice: number
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment
}

export interface RequestAppointmentsCalendarRequest {
  month: string
}

export interface RequestAppointmentsQuery {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Client information
  name?: string
  phoneNumber?: number
  email?: string
  service?: ObjectId

  // Appointment details
  startTime?: Date
  endTime?: Date
}

// consultancy-appointment
export interface ConsultancyAppointmentsRequest {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // executor
  executor?: ObjectId

  // Client information
  customer: ObjectId // Reference to the customer's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  // executor
  service?: ObjectId

  // Appointment details
  artist: ObjectId // Reference to the artist's document
  note?: string // Additional note about the appointment

  // Status management
  status: AppointmentStatus // Appointment status

  // Time to do (ARRAY)
  session?: ObjectId[]
}

export interface ConsultancyAppointmentsQuery {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // user
  user?: ObjectId

  // Client information
  customer: ObjectId // Reference to the customer's document

  // Appointment details
  artist: ObjectId // Reference to the artist's document

  // Status management
  status: AppointmentStatus // Appointment status

  // Time to do (ARRAY)
  session?: ObjectId[]
}

// tattoo-appointment
export interface TattooAppointmentsRequest {
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

export interface TattooAppointmentsQuery {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // consultant
  executor?: ObjectId

  // Client information
  customer: ObjectId // Reference to the customer's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  // Appointment details
  artist: ObjectId // Reference to the artist's document

  // Status management
  status: AppointmentTattooStatus // Appointment status

  // Service
  service: string

  // Time to do (ARRAY)
  session: ObjectId[]
}

// tattoo-appointment
export interface SessionAppointmentsRequest {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Appointment information
  artist: ObjectId
  service: string
  executor?: ObjectId
  appointment: ObjectId

  // Appointment details
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment

  // Status management
  status: SessionStatus // Appointment status
}

export interface SessionAppointmentsQuery {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Appointment information
  artist: ObjectId
  service: string
  executor?: ObjectId
  appointment: ObjectId

  // Appointment details
  startTime: Date
  endTime: Date
}

export interface RequestTattooAppointmentsByIdQuery {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Appointment information
  customerId?: string
  artist?: ObjectId
  service?: string
  // Appointment details
  date: Date | string
}
