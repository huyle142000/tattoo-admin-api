import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
import { COMMON_MESSAGE, TATTOO_CATEGORY_MESSAGES } from '~/constant/messages'
import { checkDuplicateNameValidator, checkExistentFieldValidator } from '../common.middlewares'

// CATEGORY TATTOOS

export const checkPostTattooCategoryValidator = validate(
  checkSchema(
    {
      name: {
        custom: checkDuplicateNameValidator(databaseService.tattooCategories)
      }
    },
    ['body']
  )
)

export const checkExistentTattooCategoryValidator = validate(
  checkSchema({
    id: {
      in: 'params',
      custom: checkExistentFieldValidator(TATTOO_CATEGORY_MESSAGES.IS_NOT_EXISTED, [databaseService.tattooCategories])
    }
  })
)
