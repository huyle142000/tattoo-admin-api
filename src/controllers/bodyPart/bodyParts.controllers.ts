import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { COMMON_MESSAGE, TATTOO_CATEGORY_MESSAGES } from '~/constant/messages'
import { LanguageQueriesRequest, LanguagesRequest, RequestByID } from '~/models/requests/common.request'
import bodyPartsService from '~/services/bodyPart/bodyParts.services'

export const getBodyPartsController = async (
  req: Request<ParamsDictionary, any, LanguageQueriesRequest>,
  res: Response
) => {
  const result = await bodyPartsService.getBodyParts(req?.params)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
export const getBodyPartByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await bodyPartsService.getBodyParts({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const deleteBodyPartByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await bodyPartsService.deleteBodyPart(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const postBodyPartController = async (req: Request<ParamsDictionary, any, LanguagesRequest>, res: Response) => {
  console.log(123412341234)
  const result = await bodyPartsService.postBodyParts(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchBodyPartController = async (req: Request<ParamsDictionary, any, LanguagesRequest>, res: Response) => {
  const result = await bodyPartsService.updateBodyPart(req.params.id, req.body)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}
