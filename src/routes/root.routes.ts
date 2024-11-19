import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import usersRouter from './users.routes'
import { Application } from 'express'
import tattoosRouter from './tattoos.routes'
import serviceRouter from './service.routes'
import unitRouter from './unit.routes'
import appointmentsRouter from './appointment.routes'
import bodyPartRouter from './bodyPart.routes'

export default function rootRoutes(app: Application) {
  app.use('/users', usersRouter)

  // Tattoos
  app.use('', tattoosRouter)

  // Services
  app.use('/services', serviceRouter)

  // Unit
  app.use('units', unitRouter)

  // bodyPart
  app.use('', bodyPartRouter)

  // appointment
  app.use('', appointmentsRouter)

  // Error pot
  app.use(defaultErrorHandler)
}
