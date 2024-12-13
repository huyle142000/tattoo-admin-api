import { Router } from 'express'
import {
  deleteInventoryByIDController,
  getInventoryByIDController,
  getInventoriesController,
  patchInventoryController,
  postInventoryController
} from '~/controllers/inventories/inventories.controllers'
import { checkAdminAccessTokenValidator } from '~/middlewares/common.middlewares'
import { checkDuplicateNameInventoryValidator } from '~/middlewares/inventory/inventories.middlewares'

const inventoryRouter = Router()

inventoryRouter.get('/inventories', getInventoriesController)
inventoryRouter.get('/:id', getInventoryByIDController)
inventoryRouter.post(
  '/inventories',
  checkAdminAccessTokenValidator,
  checkDuplicateNameInventoryValidator,
  postInventoryController
)

inventoryRouter.patch(
  '/:id',
  checkAdminAccessTokenValidator,
  checkDuplicateNameInventoryValidator,
  patchInventoryController
)

inventoryRouter.delete('/:id', checkAdminAccessTokenValidator, deleteInventoryByIDController)

inventoryRouter.get('/inventories-ctgs', getInventoriesController)
inventoryRouter.get('/inventories-ctgs/:id', getInventoryByIDController)
inventoryRouter.post(
  '/inventories-ctgs',
  checkAdminAccessTokenValidator,
  checkDuplicateNameInventoryValidator,
  postInventoryController
)

inventoryRouter.patch(
  '/inventories-ctgs/:id',
  checkAdminAccessTokenValidator,
  checkDuplicateNameInventoryValidator,
  patchInventoryController
)

inventoryRouter.delete('/inventories-ctgs/:id', checkAdminAccessTokenValidator, deleteInventoryByIDController)

export default inventoryRouter
