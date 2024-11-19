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
  service: ObjectId

  // Appointment details
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment
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
  client: ObjectId // Reference to the client's document

  // Tattoo information
  tattoo: ObjectId // Reference to the tattoo's document

  // executor
  service: ObjectId

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
  client: ObjectId // Reference to the client's document

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

  // consultant
  executor: ObjectId

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
  session?: any
}

export interface TattooAppointmentsQuery {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // consultant
  executor?: ObjectId

  // Client information
  client: ObjectId // Reference to the client's document

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
