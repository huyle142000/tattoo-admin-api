import { Router } from 'express'
import {
  deleteServiceByIDController,
  getServiceByIDController,
  getServicesController,
  patchServiceController,
  postServiceController
} from '~/controllers/service/services.controllers'
import { checkAdminAccessTokenValidator } from '~/middlewares/common.middlewares'
import { checkDuplicateNameServiceValidator } from '~/middlewares/service/services.middlewares'

const serviceRouter = Router()

serviceRouter.get('', getServicesController)
serviceRouter.get('/:id', getServiceByIDController)
serviceRouter.post('', checkAdminAccessTokenValidator, checkDuplicateNameServiceValidator, postServiceController)
serviceRouter.patch('/:id', checkAdminAccessTokenValidator, checkDuplicateNameServiceValidator, patchServiceController)
serviceRouter.delete('/:id', checkAdminAccessTokenValidator, deleteServiceByIDController)

export default serviceRouter
