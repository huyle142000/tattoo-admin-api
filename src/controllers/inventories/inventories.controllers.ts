import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { COMMON_MESSAGE, TATTOO_CATEGORY_MESSAGES } from '~/constant/messages'
import { LanguageQueriesRequest, RequestByID } from '~/models/requests/common.request'
import {
  PostInventoriesRequest,
  PostInventoryCtgsRequest,
  UpdateInventoriesRequest,
  UpdateInventoryCtgsRequest
} from '~/models/requests/Inventories.request'
import inventoriesService from '~/services/inventory/inventories.services'

export const getInventoriesController = async (
  req: Request<ParamsDictionary, any, LanguageQueriesRequest>,
  res: Response
) => {
  const result = await inventoriesService.getInventories(req?.params)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
export const getInventoryByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await inventoriesService.getInventories({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const deleteInventoryByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await inventoriesService.deleteInventory(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const postInventoryController = async (
  req: Request<ParamsDictionary, any, PostInventoriesRequest>,
  res: Response
) => {
  const result = await inventoriesService.postInventory(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchInventoryController = async (
  req: Request<ParamsDictionary, any, UpdateInventoriesRequest>,
  res: Response
) => {
  const result = await inventoriesService.updateInventory(req.params.id, req.body)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}

export const getInventoryCtgsController = async (
  req: Request<ParamsDictionary, any, LanguageQueriesRequest>,
  res: Response
) => {
  const result = await inventoriesService.getInventoryCtgs(req?.params)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
export const getInventoryCtgsByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await inventoriesService.getInventoryCtgs({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const deleteInventoryCtgsByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await inventoriesService.deleteInventoryCtgs(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const postInventoryCtgsController = async (
  req: Request<ParamsDictionary, any, PostInventoryCtgsRequest>,
  res: Response
) => {
  const result = await inventoriesService.postInventoryCtgs(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchInventoryCtgsController = async (
  req: Request<ParamsDictionary, any, UpdateInventoryCtgsRequest>,
  res: Response
) => {
  const result = await inventoriesService.updateInventoryCtgs(req.params.id, req.body)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}
