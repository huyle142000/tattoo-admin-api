import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
import { checkDuplicateNameValidator } from '../common.middlewares'

export const checkDuplicateNameUnitValidator = validate(
  checkSchema({
    name: {
      custom: checkDuplicateNameValidator(databaseService.units)
    }
  })
)
