import { ObjectId } from 'mongodb' // Import for using ObjectId if needed
import cron from 'node-cron'
import { SessionStatus } from '~/constant/enums'

interface SessionAppointmentsType {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Appointment information
  artist: ObjectId
  executor?: ObjectId
  appointment: ObjectId

  // Appointment details
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment
  sessionsCompletedImages?: string[]

  // Status management
  status: SessionStatus // Appointment status
  // cronJob
  // cronJob?: { startJob: Date; endJob: Date }

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp
}

export default class SessionAppointment {
  _id?: ObjectId // Optional ObjectId for MongoDB integration

  // Appointment information
  artist: ObjectId
  executor?: ObjectId
  appointment: ObjectId

  // Appointment details
  startTime: Date
  endTime: Date
  note?: string // Additional note about the appointment
  sessionsCompletedImages?: string[]

  // cronJob
  // cronJob?: { startJob: cron.ScheduledTask | string; endJob: cron.ScheduledTask | string }

  // Status management
  status: SessionStatus // Appointment status

  // Timestamps (optional)
  createdAt?: Date // Optional creation timestamp
  updatedAt?: Date // Optional update timestamp

  constructor(session: SessionAppointmentsType) {
    this._id = session._id // Optional ObjectId assignment

    // Appointment information
    this.artist = session.artist
    this.executor = session.executor
    this.appointment = session.appointment

    // cronJob
    // this.cronJob = session.cronJob

    // Appointment details
    this.startTime = session.startTime
    this.endTime = session.endTime
    this.note = session.note
    this.sessionsCompletedImages = session.sessionsCompletedImages

    // Status management
    this.status = session.status || SessionStatus.Inprogress // Default to pending

    // Timestamps (optional)
    this.createdAt = session.createdAt || new Date()
    this.updatedAt = session.updatedAt || new Date()
  }
}
