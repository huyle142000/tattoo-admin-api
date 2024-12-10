import { WithId } from 'mongodb'
import RequestAppointment from '~/models/schemas/appointment/RequestAppointments.schemas'
import TattooAppointment from '~/models/schemas/appointment/TattooAppointments.schemas'

export interface IAppointmentCalendar {
  date: string
  appointments: WithId<RequestAppointment>[]
  isBooked: boolean
}

export interface IAppointmentCalendarHour {
  date: string
  timeSlots: { time: string; isBooked: boolean; appointment?: TattooAppointment }[]
}
