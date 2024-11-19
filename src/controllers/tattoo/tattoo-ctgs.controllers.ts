import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { COMMON_MESSAGE, TATTOO_CATEGORY_MESSAGES } from '~/constant/messages'
import { RequestByID } from '~/models/requests/common.request'
import { PostTattooCategoriesRequest, TattooCategoriesRequest } from '~/models/requests/Tattoos.request'
import tattooCtgsServices from '~/services/tattoo/tattoo-ctgs.services'

export const getTattooCategoriesController = async (
  req: Request<ParamsDictionary, any, TattooCategoriesRequest>,
  res: Response
) => {
  const result = await tattooCtgsServices.getCategories(req.params)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
export const getTattooCategoriesByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await tattooCtgsServices.getCategories({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const deleteTattooCategoriesByIDController = async (
  req: Request<ParamsDictionary, any, RequestByID>,
  res: Response
) => {
  const result = await tattooCtgsServices.deleteCategories(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const postTattooCategoriesController = async (
  req: Request<ParamsDictionary, any, PostTattooCategoriesRequest>,
  res: Response
) => {
  const result = await tattooCtgsServices.postCategories(req.body)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
