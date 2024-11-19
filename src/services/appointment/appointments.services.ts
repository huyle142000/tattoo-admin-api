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
  RequestAppointmentsQuery,
  RequestAppointmentsRequest,
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
        extraFindObj.client = payload.user_id

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
        extraFindObj.client = payload.user_id

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

  async postTattooAppointments(payload: TattooAppointmentsRequest, executor?: ObjectId) {
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
        extraFindObj.client = payload.user_id

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
