import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { COMMON_MESSAGE, TATTOO_CATEGORY_MESSAGES } from '~/constant/messages'
import { LanguageQueriesRequest, LanguagesRequest, RequestByID } from '~/models/requests/common.request'
import unitsService from '~/services/unit/units.services'

export const getUnitsController = async (
  req: Request<ParamsDictionary, any, LanguageQueriesRequest>,
  res: Response
) => {
  const result = await unitsService.getUnits(req.params)
  return res.send({
    message: TATTOO_CATEGORY_MESSAGES.POST_SUCCESSFULLY,
    result
  })
}
export const getUnitByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await unitsService.getUnits({ _id: new ObjectId(req.params?.id) })
  return res.send({
    message: COMMON_MESSAGE.GET_SUCCESSFULLY,
    result
  })
}

export const deleteUnitByIDController = async (req: Request<ParamsDictionary, any, RequestByID>, res: Response) => {
  const result = await unitsService.deleteUnit(new ObjectId(req.params?.id))
  return res.send({
    message: COMMON_MESSAGE.DELETE_SUCCESSFULLY,
    result
  })
}

export const postUnitController = async (req: Request<ParamsDictionary, any, LanguagesRequest>, res: Response) => {
  const result = await unitsService.postUnits(req.body)
  return res.send({
    message: COMMON_MESSAGE.POST_SUCCESSFULLY,
    result
  })
}

export const patchUnitController = async (req: Request<ParamsDictionary, any, LanguagesRequest>, res: Response) => {
  const result = await unitsService.updateUnit(req.params.id, req.body)
  return res.send({
    message: COMMON_MESSAGE.UPDATE_SUCCESSFULLY,
    result
  })
}
