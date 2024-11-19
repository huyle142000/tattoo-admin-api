import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
import { COMMON_MESSAGE, TATTOOS_MESSAGE } from '~/constant/messages'
import { TattooSize } from '~/constant/enums'
import { checkDuplicateNameValidator, checkExistentFieldValidator } from '../common.middlewares'

// POST-CHECK
export const checkPostTattooValidator = validate(
  checkSchema(
    {
      name: {
        custom: checkDuplicateNameValidator(databaseService.tattooCategories)
      },
      description: {
        optional: true,
        isString: {
          errorMessage: TATTOOS_MESSAGE.DESCRIPTION_STRING
        }
      },
      price: {
        isNumeric: {
          errorMessage: TATTOOS_MESSAGE.PRICE_NUMERIC
        }
      },
      completionTime: {
        isNumeric: {
          errorMessage: TATTOOS_MESSAGE.COMPLETION_TIME_NUMERIC
        }
      },
      style: {
        optional: true,
        isString: {
          errorMessage: TATTOOS_MESSAGE.STYLE_STRING
        }
      },
      size: {
        optional: true,
        isIn: {
          options: [TattooSize.Small, TattooSize.Medium, TattooSize.Large],
          errorMessage: TATTOOS_MESSAGE.SIZE_IN_OPTIONS
        }
      },
      bodyPart: {
        optional: true,
        // Adjust validation based on bodyPart type (string or ObjectId)
        isString: {
          errorMessage: TATTOOS_MESSAGE.BODYPART_STRING
        },
        custom: checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_BODYPART, [databaseService.bodyParts])
      },
      artist: {
        optional: true,
        isString: {
          errorMessage: TATTOOS_MESSAGE.ARTIST_STRING
        },
        custom: checkExistentFieldValidator(TATTOOS_MESSAGE.ARTIST_IS_INEXISTENT, [databaseService.users])
      },
      isActive: {
        optional: true,
        isBoolean: {
          errorMessage: TATTOOS_MESSAGE.ISACTIVE_BOOLEAN
        }
      },
      category: {
        isString: {
          errorMessage: TATTOOS_MESSAGE.CATEGORYID_STRING // Adjust based on categoryId type
        },
        custom: checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_CATEGORY, [databaseService.tattooCategories])
      }
    },
    ['body']
  )
)

export const checkExistentTattooValidator = validate(
  checkSchema({
    id: {
      in: 'params',
      custom: checkExistentFieldValidator(TATTOOS_MESSAGE.IS_INEXISTENT, [databaseService.tattoos])
    }
  })
)
