import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { COMMON_MESSAGE, TATTOO_CATEGORY_MESSAGES } from '~/constant/messages'
import { LanguageQueriesRequest, LanguagesRequest, RequestByID } from '~/models/requests/common.request'
import services from '~/services/service/services.services'

export const getServicesController = async (
  req: Request<ParamsDictionary, any, LanguageQueriesRequest>,
  res: Response
) => {
  const result = await services.getServices(req.params)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
export const getServiceByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await services.getServices({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const deleteServiceByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await services.deleteServices(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const postServiceController = async (req: Request<ParamsDictionary, any, LanguagesRequest>, res: Response) => {
  const result = await services.postServices(req.body)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}

export const patchServiceController = async (req: Request<ParamsDictionary, any, LanguagesRequest>, res: Response) => {
  const result = await services.updateService(req.params.id, req.body)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
