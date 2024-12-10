import {
  AppointmentStatus,
  AppointmentStatusRequest,
  AppointmentTattooStatus,
  SessionStatus,
  UserRoles
} from '~/constant/enums'
import databaseService from '../database.services'
import { ObjectId } from 'mongodb'
import {
  ConsultancyAppointmentsQuery,
  ConsultancyAppointmentsRequest,
  RequestAppointmentsCalendarRequest,
  RequestAppointmentsQuery,
  RequestAppointmentsRequest,
  RequestTattooAppointmentsByIdQuery,
  SessionAppointmentsQuery,
  SessionAppointmentsRequest,
  TattooAppointmentsQuery,
  TattooAppointmentsRequest
} from '~/models/requests/Appointments.request'
import RequestAppointment from '~/models/schemas/appointment/RequestAppointments.schemas'
import ConsultancyAppointment from '~/models/schemas/appointment/ConsultancyAppointments.schemas'
import TattooAppointment from '~/models/schemas/appointment/TattooAppointments.schemas'
import SessionAppointment from '~/models/schemas/appointment/SessionAppointments.schemas'
import { createNodeCron } from '~/utils/common'
import flatted from 'flatted'
import cron from 'node-cron'
import {
  addDays,
  addMinutes,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { IAppointmentCalendar, IAppointmentCalendarHour } from '~/interface'

class RequestAppointmentServices {
  async postRequestAppointments(payload: RequestAppointmentsRequest) {
    await databaseService.requestAppointments.insertOne(
      new RequestAppointment({
        ...payload,
        status: AppointmentStatusRequest.Pending
      })
    )
    return true
  }

  async getRequestAppointments(filters?: Partial<RequestAppointmentsQuery>): Promise<RequestAppointment[]> {
    const query = filters
      ? databaseService.requestAppointments.find(filters)
      : databaseService.requestAppointments.find({})
    const result = await query.toArray()

    return result
  }

  async getRequestAppointmentsCalendar(
    filters?: Partial<RequestAppointmentsCalendarRequest>
  ): Promise<IAppointmentCalendar[]> {
    const month = filters?.month
    const currentYear = new Date().getFullYear()

    const start = new Date(`${currentYear}-${String(month).padStart(2, '0')}-01`)
    const end = endOfMonth(start)

    const appointments = await databaseService.requestAppointments
      .find({
        date: { $gte: start, $lte: end }
      })
      .toArray()

    const daysInMonth = []
    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
      const formattedDate = format(day, 'yyyy-MM-dd')

      const dayAppointments = appointments.filter(
        (appointment) => format(new Date(appointment.date), 'yyyy-MM-dd') === formattedDate
      )

      daysInMonth.push({
        date: formattedDate,
        appointments: dayAppointments,
        isBooked: dayAppointments.length > 0
      })
    }

    return daysInMonth
  }

  async updateRequestAppointment(id: string, payload: RequestAppointmentsRequest) {
    const tattooCtg = await databaseService.requestAppointments.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload
        },
        $currentDate: {
          update_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return tattooCtg
  }

  async deleteRequestAppointment(payload: ObjectId) {
    await databaseService.requestAppointments.deleteOne({ _id: payload })
    return true
  }

  // consultancy-appointment

  async getConsultancyAppointments(
    filters?: Partial<ConsultancyAppointmentsQuery>,
    payload?: {
      user_id?: string
      role?: UserRoles
    }
  ): Promise<ConsultancyAppointment[]> {
    const extraFindObj: any = {}
    switch (payload?.role) {
      case UserRoles.Artist:
        extraFindObj.artist = payload.user_id

        break
      case UserRoles.Client:
        extraFindObj.customer = payload.user_id

        break

      default:
        break
    }

    const query = filters
      ? databaseService.consultancyAppointments.find({ ...filters, ...extraFindObj })
      : databaseService.consultancyAppointments.find({ ...extraFindObj })
    const result = await query.toArray()

    return result
  }

  async postConsultancyAppointments(payload: ConsultancyAppointmentsRequest, executor?: ObjectId) {
    await databaseService.consultancyAppointments.insertOne(
      new ConsultancyAppointment({
        ...payload
      })
    )
    return true
  }

  async updateConsultancyAppointment(
    id: string | ObjectId,
    payload: ConsultancyAppointmentsRequest | { status: AppointmentStatus },
    executor?: ObjectId
  ) {
    console.log(payload, 'payload')
    const tattooCtg = await databaseService.consultancyAppointments.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          executor
        },
        $currentDate: {
          update_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return tattooCtg
  }

  async deleteConsultancyAppointment(payload: ObjectId) {
    await databaseService.consultancyAppointments.deleteOne({ _id: payload })
    return true
  }

  // tattoo-appointment

  async getTattooAppointments(
    filters?: Partial<TattooAppointmentsQuery>,
    payload?: {
      user_id?: string
      role?: UserRoles
    }
  ): Promise<TattooAppointment[]> {
    const extraFindObj: any = {}
    switch (payload?.role) {
      case UserRoles.Artist:
        extraFindObj.artist = payload.user_id

        break
      case UserRoles.Client:
        extraFindObj.customer = payload.user_id

        break

      default:
        break
    }

    const query = filters
      ? databaseService.tattooAppointments.find({ filters, ...extraFindObj })
      : databaseService.tattooAppointments.find({ ...extraFindObj })
    const result = await query.toArray()

    return result
  }

  async getTattooAppointmentsByIdHour({
    filters,
    payload
  }: {
    filters?: Partial<RequestTattooAppointmentsByIdQuery>
    payload?: {
      user_id?: string
      role?: UserRoles
    }
  }): Promise<IAppointmentCalendarHour[]> {
    const extraFindObj: any = {}
    switch (payload?.role) {
      case UserRoles.Artist:
        extraFindObj.artistId = payload.user_id
        break
      case UserRoles.Client:
        extraFindObj.customerId = payload.user_id
        break
      default:
        break
    }

    const query = filters
      ? databaseService.tattooAppointments.find({ filters, ...extraFindObj })
      : databaseService.tattooAppointments.find({ ...extraFindObj })
    const appointments = await query.toArray()

    const result: {
      date: string
      timeSlots: { time: string; isBooked: boolean; appointment?: TattooAppointment }[]
    }[] = []

    const startDay = parseISO(filters?.date as string)
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startDay, i)
      const startTime = startOfDay(currentDate)
      const endTime = endOfDay(currentDate)

      const timeSlots: { time: string; start: Date; end: Date }[] = []
      let currentTime = startTime

      while (currentTime <= endTime) {
        const nextTime = addMinutes(currentTime, 30)
        timeSlots.push({
          time: format(currentTime, 'HH:mm'),
          start: currentTime,
          end: nextTime
        })
        currentTime = nextTime
      }

      const dailyTimeSlots = timeSlots.map((slot) => {
        const appointment = appointments.find((appt) =>
          isWithinInterval(parseISO(appt.date), { start: slot.start, end: slot.end })
        )

        return {
          time: slot.time,
          isBooked: Boolean(appointment),
          ...(appointment ? { appointment } : {})
        }
      })

      result.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        timeSlots: dailyTimeSlots
      })
    }

    return result
  }

  async postTattooAppointments(payload: TattooAppointmentsRequest, executor?: ObjectId) {
    console.log(payload, 'payload')
    await databaseService.tattooAppointments.insertOne(
      new TattooAppointment({
        ...payload,
        executor
      })
    )
    return true
  }

  async updateTattooAppointment(
    id: string | ObjectId,
    payload: TattooAppointmentsRequest | { status: AppointmentStatus },
    executor?: ObjectId
  ) {
    const tattooCtg = await databaseService.tattooAppointments.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          executor
        },
        $currentDate: {
          update_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return tattooCtg
  }

  async deleteTattooAppointment(payload: ObjectId) {
    await databaseService.tattooAppointments.deleteOne({ _id: payload })
    return true
  }

  // session-appointment

  async getSessionAppointments(
    filters?: Partial<SessionAppointmentsQuery>,
    payload?: {
      user_id?: string
      role?: UserRoles
    }
  ): Promise<SessionAppointment[]> {
    const extraFindObj: any = {}
    switch (payload?.role) {
      case UserRoles.Artist:
        extraFindObj.artist = payload.user_id

        break
      case UserRoles.Client:
        extraFindObj.customer = payload.user_id

        break

      default:
        break
    }

    const query = filters
      ? databaseService.sessionAppointments.find({ filters, ...extraFindObj })
      : databaseService.sessionAppointments.find({ ...extraFindObj })
    const result = await query.toArray()

    return result
  }

  async postSessionAppointments(payload: SessionAppointmentsRequest, executor?: ObjectId) {
    // // Run job to update status appointment in specific time
    // const { startJob, endJob } = await createNodeCron({
    //   startTime: payload.startTime,
    //   startTimeFunc: async () => {
    //     return await this.updateConsultancyAppointment(
    //       payload?.appointment,
    //       { status: AppointmentStatus.Ongoing },
    //       executor
    //     )
    //   },
    //   endTime: payload.endTime,
    //   endTimeFunc: async () => {
    //     return await this.updateConsultancyAppointment(
    //       payload?.appointment,
    //       { status: AppointmentStatus.Completed },
    //       executor
    //     )
    //   }
    // })

    // const flattenedStartJob = flatted.stringify(startJob)
    // const flattenedEndJob = flatted.stringify(endJob)
    // console.log(startJob, 'startJob')
    await databaseService.sessionAppointments.insertOne(
      new SessionAppointment({
        ...payload,
        executor
        // cronJob: {
        //   startJob: flattenedStartJob,
        //   endJob: flattenedEndJob
        // }
      })
    )
    return true
  }

  async updateSessionAppointment(id: string, payload: SessionAppointmentsRequest, executor?: ObjectId) {
    let cronJob

    if (payload?.startTime && payload?.endTime) {
      const { startJob, endJob } = createNodeCron({
        startTime: payload.startTime,
        startTimeFunc: async () => {
          return await this.updateConsultancyAppointment(
            payload?.appointment,
            { status: AppointmentStatus.Ongoing },
            executor
          )
        },
        endTime: payload.endTime,
        endTimeFunc: async () => {
          return await this.updateConsultancyAppointment(
            payload?.appointment,
            { status: AppointmentStatus.Completed },
            executor
          )
        }
      })
      cronJob = {
        startJob,
        endJob
      }
    }

    let sessionAppointment
    if (cronJob) {
      sessionAppointment = await databaseService.sessionAppointments.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
            executor,
            cronJob
          },
          $currentDate: {
            update_at: true
          }
        },
        {
          returnDocument: 'after'
        }
      )
    } else {
      if (payload?.status == SessionStatus.Rescheduled) {
        const findSession: any = await databaseService.sessionAppointments.findOne({ _id: new ObjectId(id) })
        const parseStartCronJob: cron.ScheduledTask = flatted?.parse(findSession?.cronJob?.startJob)
        const parseEndCronJob: cron.ScheduledTask = flatted?.parse(findSession?.cronJob?.endJob)
        console.log(parseStartCronJob, 'parseStartCronJob')

        try {
          await parseStartCronJob?.stop()
          await parseEndCronJob?.stop()
        } catch (error) {
          console.log(error, 'error')
        }
        await this.updateConsultancyAppointment(
          payload?.appointment,
          { status: AppointmentStatus.Rescheduled },
          executor
        )
      }
      sessionAppointment = await databaseService.sessionAppointments.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
            executor
          },
          $currentDate: {
            update_at: true
          }
        },
        {
          returnDocument: 'after'
        }
      )
    }
    return sessionAppointment
  }

  async deleteSessionAppointment(payload: ObjectId) {
    await databaseService.sessionAppointments.deleteOne({ _id: payload })
    return true
  }
}

const appointmentsService = new RequestAppointmentServices()
export default appointmentsService
