import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enums'
import { COMMON_MESSAGE } from '~/constant/messages'
import {
  ConsultancyAppointmentsQuery,
  ConsultancyAppointmentsRequest,
  RequestAppointmentsCalendarRequest,
  RequestAppointmentsRequest,
  RequestTattooAppointmentsByIdQuery,
  SessionAppointmentsQuery,
  SessionAppointmentsRequest,
  TattooAppointmentsQuery,
  TattooAppointmentsRequest
} from '~/models/requests/Appointments.request'
import { RequestByID } from '~/models/requests/common.request'
import appointmentsService from '~/services/appointment/appointments.services'

export const getRequestAppointmentsController = async (
  req: Request<ParamsDictionary, any, RequestAppointmentsRequest>,
  res: Response
) => {
  const result = await appointmentsService.getRequestAppointments(req.query)
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const getRequestAppointmentsCalendarController = async (
  req: Request<ParamsDictionary, any, RequestAppointmentsCalendarRequest>,
  res: Response
) => {
  const result = await appointmentsService.getRequestAppointmentsCalendar(req.query)
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const getRequestAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.getRequestAppointments({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const postRequestAppointmentController = async (
  req: Request<ParamsDictionary, any, RequestAppointmentsRequest>,
  res: Response
) => {
  const result = await appointmentsService.postRequestAppointments(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchRequestAppointmentController = async (
  req: Request<ParamsDictionary, any, RequestAppointmentsRequest>,
  res: Response
) => {
  const result = await appointmentsService.updateRequestAppointment(req.params.id, req.body)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}

export const deleteRequestAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.deleteRequestAppointment(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

// CONSULTANT_APPOINTMENT
export const getConsultancyAppointmentsController = async (
  req: Request<ParamsDictionary, any, ConsultancyAppointmentsQuery>,
  res: Response
) => {
  const user_id = req?.decode_authorization?.user_id
  const role = req?.decode_authorization?.role

  const result = await appointmentsService.getConsultancyAppointments(req.query, {
    user_id,
    role
  })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}
export const getConsultancyAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.getConsultancyAppointments({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const postConsultancyAppointmentController = async (
  req: Request<ParamsDictionary, any, ConsultancyAppointmentsRequest>,
  res: Response
) => {
  const result = await appointmentsService.postConsultancyAppointments(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchConsultancyAppointmentController = async (
  req: Request<ParamsDictionary, any, ConsultancyAppointmentsRequest>,
  res: Response
) => {
  const executor = new ObjectId(req?.decode_authorization?.user_id)
  const result = await appointmentsService.updateConsultancyAppointment(req.params.id, req.body, executor)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}

export const deleteConsultancyAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.deleteConsultancyAppointment(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

// TATTOO-APPOINTMENT
export const getTattooAppointmentsController = async (
  req: Request<ParamsDictionary, any, TattooAppointmentsQuery>,
  res: Response
) => {
  const user_id = req?.decode_authorization?.user_id
  const role = req?.decode_authorization?.role
  const result = await appointmentsService.getTattooAppointments(req.query, {
    user_id,
    role
  })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}
export const getTattooAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestTattooAppointmentsByIdQuery>,
  res: Response
) => {
  const user_id = req?.decode_authorization?.user_id
  const role = req?.decode_authorization?.role

  const result = await appointmentsService.getTattooAppointmentsByIdHour({
    filters: req.body,
    payload: {
      user_id,
      role
    }
  })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const postTattooAppointmentController = async (
  req: Request<ParamsDictionary, any, TattooAppointmentsRequest>,
  res: Response
) => {
  const executor = new ObjectId(req?.decode_authorization?.user_id)
  const result = await appointmentsService.postTattooAppointments(req.body, executor)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchTattooAppointmentController = async (
  req: Request<ParamsDictionary, any, TattooAppointmentsRequest>,
  res: Response
) => {
  const executor = new ObjectId(req?.decode_authorization?.user_id)

  const result = await appointmentsService.updateTattooAppointment(req.params.id, req.body, executor)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}

export const deleteTattooAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.deleteTattooAppointment(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

// SESSION-APPOINTMENT
export const getSessionAppointmentsController = async (
  req: Request<ParamsDictionary, any, SessionAppointmentsQuery>,
  res: Response
) => {
  const user_id = req?.decode_authorization?.user_id
  const role = req?.decode_authorization?.role

  const result = await appointmentsService.getSessionAppointments(req.query, {
    user_id,
    role
  })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}
export const getSessionAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.getSessionAppointments({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const postSessionAppointmentController = async (
  req: Request<ParamsDictionary, any, SessionAppointmentsRequest>,
  res: Response
) => {
  const executor = new ObjectId(req?.decode_authorization?.user_id)

  const result = await appointmentsService.postSessionAppointments(req.body, executor)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchSessionAppointmentController = async (
  req: Request<ParamsDictionary, any, SessionAppointmentsRequest>,
  res: Response
) => {
  const executor = new ObjectId(req?.decode_authorization?.user_id)

  const result = await appointmentsService.updateSessionAppointment(req.params.id, req.body, executor)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}

export const deleteSessionAppointmentByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await appointmentsService.deleteSessionAppointment(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}
