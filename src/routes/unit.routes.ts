import { Router } from 'express'
import {
  deleteUnitByIDController,
  getUnitByIDController,
  getUnitsController,
  patchUnitController,
  postUnitController
} from '~/controllers/unit/units.controllers'
import { checkAdminAccessTokenValidator } from '~/middlewares/common.middlewares'
import { checkDuplicateNameUnitValidator } from '~/middlewares/unit/units.middlewares'

const unitRouter = Router()

unitRouter.get('', getUnitsController)
unitRouter.get('/:id', getUnitByIDController)
unitRouter.post('', checkAdminAccessTokenValidator, checkDuplicateNameUnitValidator, postUnitController)
unitRouter.patch('/:id', checkAdminAccessTokenValidator, checkDuplicateNameUnitValidator, patchUnitController)
unitRouter.delete('/:id', checkAdminAccessTokenValidator, deleteUnitByIDController)

export default unitRouter
