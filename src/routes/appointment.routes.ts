import { Router } from 'express'
import {
  deleteConsultancyAppointmentByIDController,
  deleteRequestAppointmentByIDController,
  getConsultancyAppointmentByIDController,
  getConsultancyAppointmentsController,
  getRequestAppointmentByIDController,
  getRequestAppointmentsController,
  patchConsultancyAppointmentController,
  patchRequestAppointmentController,
  postConsultancyAppointmentController,
  postRequestAppointmentController,
  getTattooAppointmentsController,
  getTattooAppointmentByIDController,
  postTattooAppointmentController,
  patchTattooAppointmentController,
  deleteTattooAppointmentByIDController,
  getSessionAppointmentsController,
  getSessionAppointmentByIDController,
  postSessionAppointmentController,
  patchSessionAppointmentController,
  deleteSessionAppointmentByIDController,
  getRequestAppointmentsCalendarController
} from '~/controllers/appointment/appointments.controllers'
import {
  checkPostAppointmentRequestsValidator,
  checkPostConsultantAppointmentsValidator,
  checkPostSessionAppointmentsValidator,
  checkAppointmentStatusValidator,
  checkAdminOrArtistAccessTokenValidator
} from '~/middlewares/appointment/appointments.middlewares'
import { checkAdminAccessTokenValidator, checkExistentUserValidator } from '~/middlewares/common.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const appointmentsRouter = Router()

// appointment-requests
appointmentsRouter.get(
  '/request-appointments',
  checkAdminAccessTokenValidator,
  wrapRequestHandler(getRequestAppointmentsController)
)

appointmentsRouter.get(
  '/request-appointments/calendar',
  checkAdminAccessTokenValidator,
  wrapRequestHandler(getRequestAppointmentsCalendarController)
)

appointmentsRouter.get(
  '/request-appointments/:id',
  checkExistentUserValidator,
  wrapRequestHandler(getRequestAppointmentByIDController)
)

appointmentsRouter.post(
  '/request-appointments',
  checkAdminAccessTokenValidator,
  checkPostAppointmentRequestsValidator,
  wrapRequestHandler(postRequestAppointmentController)
)
appointmentsRouter.patch(
  '/request-appointments/:id',
  checkAdminAccessTokenValidator,
  checkPostAppointmentRequestsValidator,
  wrapRequestHandler(patchRequestAppointmentController)
)
appointmentsRouter.delete(
  '/request-appointments/:id',
  checkAdminAccessTokenValidator,
  wrapRequestHandler(deleteRequestAppointmentByIDController)
)

// /consultancy-appointment
appointmentsRouter.get(
  '/consultancy-appointments',
  checkAdminAccessTokenValidator,
  wrapRequestHandler(getConsultancyAppointmentsController)
)
appointmentsRouter.get(
  '/consultancy-appointments/:id',
  checkExistentUserValidator,
  wrapRequestHandler(getConsultancyAppointmentByIDController)
)

appointmentsRouter.post(
  '/consultancy-appointments',
  checkAdminOrArtistAccessTokenValidator,
  checkPostConsultantAppointmentsValidator,
  wrapRequestHandler(postConsultancyAppointmentController)
)
appointmentsRouter.patch(
  '/consultancy-appointments/:id',
  checkAdminOrArtistAccessTokenValidator,
  checkPostConsultantAppointmentsValidator,
  wrapRequestHandler(patchConsultancyAppointmentController)
)
appointmentsRouter.delete(
  '/consultancy-appointments/:id',
  checkAdminOrArtistAccessTokenValidator,
  wrapRequestHandler(deleteConsultancyAppointmentByIDController)
)

// tattoo-appointment
appointmentsRouter.get(
  '/tattoo-appointments',
  checkExistentUserValidator,
  wrapRequestHandler(getTattooAppointmentsController)
)
appointmentsRouter.get(
  '/tattoo-appointments/:id',
  checkExistentUserValidator,
  wrapRequestHandler(getTattooAppointmentByIDController)
)

appointmentsRouter.post(
  '/tattoo-appointments',
  checkAdminOrArtistAccessTokenValidator,
  checkPostAppointmentRequestsValidator,
  wrapRequestHandler(postTattooAppointmentController)
)
appointmentsRouter.patch(
  '/tattoo-appointments/:id',
  checkAdminOrArtistAccessTokenValidator,
  checkPostAppointmentRequestsValidator,
  wrapRequestHandler(patchTattooAppointmentController)
)
appointmentsRouter.delete(
  '/tattoo-appointments/:id',
  checkAdminOrArtistAccessTokenValidator,
  checkAppointmentStatusValidator,
  wrapRequestHandler(deleteTattooAppointmentByIDController)
)

// session-appointment
appointmentsRouter.get(
  '/session-appointments',
  checkExistentUserValidator,
  wrapRequestHandler(getSessionAppointmentsController)
)
appointmentsRouter.get(
  '/session-appointments/:id',
  checkExistentUserValidator,
  wrapRequestHandler(getSessionAppointmentByIDController)
)

appointmentsRouter.post(
  '/session-appointments',
  checkAdminOrArtistAccessTokenValidator,
  checkPostSessionAppointmentsValidator,
  wrapRequestHandler(postSessionAppointmentController)
)
appointmentsRouter.patch(
  '/session-appointments/:id',
  checkAdminOrArtistAccessTokenValidator,
  checkPostSessionAppointmentsValidator,
  wrapRequestHandler(patchSessionAppointmentController)
)
appointmentsRouter.delete(
  '/session-appointments/:id',
  checkAdminOrArtistAccessTokenValidator,
  checkAppointmentStatusValidator,
  wrapRequestHandler(deleteSessionAppointmentByIDController)
)

export default appointmentsRouter
