import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { COMMON_MESSAGE } from '~/constant/messages'
import { RequestByID } from '~/models/requests/common.request'
import { PostTattoosRequest, TattoosQueryRequest } from '~/models/requests/Tattoos.request'
import tattoosServices from '~/services/tattoo/tattoos.services'

export const getTattoosController = async (req: Request<ParamsDictionary, any, TattoosQueryRequest>, res: Response) => {
  const result = await tattoosServices.getTattoos(req.query)
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const getTattooByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await tattoosServices.getTattoos({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const postTattoosController = async (req: Request<ParamsDictionary, any, PostTattoosRequest>, res: Response) => {
  const result = await tattoosServices.postTattoo(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const deleteTattooByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await tattoosServices.deleteTattoo(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const patchTattoosController = async (
  req: Request<ParamsDictionary, any, PostTattoosRequest>,
  res: Response
) => {
  const result = await tattoosServices.updateTattoo(req.params?.id, req.body)
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}
