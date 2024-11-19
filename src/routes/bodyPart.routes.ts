import { Router } from 'express'
import {
  deleteBodyPartByIDController,
  getBodyPartByIDController,
  getBodyPartsController,
  patchBodyPartController,
  postBodyPartController
} from '~/controllers/bodyPart/bodyParts.controllers'
import { checkDuplicateNameBodyPartValidator } from '~/middlewares/bodyPart/bodyParts.middlewares'
import { checkAdminAccessTokenValidator } from '~/middlewares/common.middlewares'

const bodyPartRouter = Router()

bodyPartRouter.get('/body-parts', getBodyPartsController)
bodyPartRouter.get('/:id', getBodyPartByIDController)
bodyPartRouter.post(
  '/body-parts',
  checkAdminAccessTokenValidator,
  checkDuplicateNameBodyPartValidator,
  postBodyPartController
)
bodyPartRouter.patch(
  '/:id',
  checkAdminAccessTokenValidator,
  checkDuplicateNameBodyPartValidator,
  patchBodyPartController
)
bodyPartRouter.delete('/:id', checkAdminAccessTokenValidator, deleteBodyPartByIDController)

export default bodyPartRouter
