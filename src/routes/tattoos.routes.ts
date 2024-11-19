import { Router } from 'express'
import {
  deleteTattooCategoriesByIDController,
  getTattooCategoriesByIDController,
  getTattooCategoriesController,
  postTattooCategoriesController
} from '~/controllers/tattoo/tattoo-ctgs.controllers'
import {
  deleteTattooByIDController,
  getTattoosController,
  patchTattoosController,
  postTattoosController
} from '~/controllers/tattoo/tattoos.controllers'
import { checkAdminAccessTokenValidator } from '~/middlewares/common.middlewares'
import {
  checkPostTattooCategoryValidator,
  checkExistentTattooCategoryValidator
} from '~/middlewares/tattoo/tattoo-ctgs.middlewares'
import { checkPostTattooValidator, checkExistentTattooValidator } from '~/middlewares/tattoo/tattoos.middlewares'

const tattoosRouter = Router()
//
tattoosRouter.get('/tattoos', getTattoosController)
tattoosRouter.post('/tattoos', checkAdminAccessTokenValidator, checkPostTattooValidator, postTattoosController)
tattoosRouter.patch(
  '/tattoos/:id',
  checkAdminAccessTokenValidator,
  checkExistentTattooValidator,
  patchTattoosController
)
tattoosRouter.delete('/tattoos/:id', checkExistentTattooValidator, deleteTattooByIDController)

/*****                     CTGS TATOO                   ******/
tattoosRouter.get('/tattoos-ctgs', getTattooCategoriesController)
tattoosRouter.get('/tattoos-ctgs/:id', getTattooCategoriesByIDController)

/*  name{vi,en}
    description{vi,en}
*/
tattoosRouter.patch(
  '/tattoos-ctgs/:id',
  checkAdminAccessTokenValidator,
  checkPostTattooCategoryValidator,
  postTattooCategoriesController
)

tattoosRouter.post(
  '/tattoos-ctgs',
  checkAdminAccessTokenValidator,
  checkPostTattooCategoryValidator,
  postTattooCategoriesController
)

tattoosRouter.delete(
  '/tattoos-ctgs/:id',
  checkAdminAccessTokenValidator,
  checkExistentTattooCategoryValidator,
  deleteTattooCategoriesByIDController
)

export default tattoosRouter
