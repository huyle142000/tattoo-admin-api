import { NextFunction, Request, Response } from 'express'
import { checkSchema, CustomValidator, ParamSchema } from 'express-validator'
import { ValidatorSchemaOptions } from 'express-validator/lib/middlewares/schema'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize, pick } from 'lodash'
import { Collection, ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'
import { UserRoles } from '~/constant/enums'
import { HTTP_STATUS } from '~/constant/https'
import { COMMON_MESSAGE, USER_MESSAGE } from '~/constant/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'
type FilterKeys<T> = Array<keyof T>

export const filterMiddleware =
  <T>(filterKey: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKey)
    next()
  }

export const nameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGE.NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGE.NAME_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: USER_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
  },
  trim: true
}

// Admin
export const checkAdminAccessTokenValidator = validate(
  checkSchema({
    Authorization: {
      trim: true,
      custom: {
        options: async (value: string, { req }) => {
          const access_token = (value || '')?.split('Bearer ')[1]
          console.log(access_token,"access_token")
          if (!access_token) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }

          try {
            const decode_authorization = await verifyToken({
              token: access_token,
              secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
            })

            if (decode_authorization?.role != UserRoles.Admin) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.USER_IS_NOT_ALLOWED,
                status: HTTP_STATUS.FORBIDDEN
              })
            }
            ;(req as Request).decode_authorization = decode_authorization
          } catch (error: any) {
            // Handle other potential token errors (e.g., expired token)
            if (error.name === 'JsonWebTokenError') {
              throw new ErrorWithStatus({
                message: capitalize((error as JsonWebTokenError).message),
                status: HTTP_STATUS.UNAUTHORIZED // Use 401 for token-related errors
              })
            } else {
              // Re-throw unexpected errors to prevent potential security issues
              throw error
            }
          }
          console.log(123123123)
          return true
        }
      }
    }
  })
)

// Existent User
export const checkExistentUserValidator = validate(
  checkSchema({
    Authorization: {
      trim: true,
      custom: {
        options: async (value: string, { req }) => {
          const access_token = (value || '')?.split('Bearer ')[1]
          if (!access_token) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }

          try {
            const decode_authorization = await verifyToken({
              token: access_token,
              secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
            })
            ;(req as Request).decode_authorization = decode_authorization
          } catch (error: any) {
            // Handle other potential token errors (e.g., expired token)
            if (error.name === 'JsonWebTokenError') {
              throw new ErrorWithStatus({
                message: capitalize((error as JsonWebTokenError).message),
                status: HTTP_STATUS.UNAUTHORIZED // Use 401 for token-related errors
              })
            } else {
              // Re-throw unexpected errors to prevent potential security issues
              throw error
            }
          }
          return true
        }
      }
    }
  })
)

// Existent Field
export const checkExistentFieldValidator = (
  message: string,
  databases: Collection<any>[]
): ValidatorSchemaOptions<'custom'> | undefined => {
  return {
    options: async (value: string) => {
      try {
        let checkValidField = false
        const results = await Promise.all(
          databases?.map(async (database) => {
            const field = await database.findOne({ _id: new ObjectId(value) })
            return field ? true : false
          })
        )
        checkValidField = results.some((result) => result) // Check if any element in results is true

        if (!checkValidField) {
          throw new ErrorWithStatus({ message, status: HTTP_STATUS.UNAUTHORIZED })
        }
      } catch (error: any) {
        // Handle other potential token errors (e.g., expired token)
        if (error.name === 'JsonWebTokenError') {
          throw new ErrorWithStatus({
            message: capitalize((error as JsonWebTokenError).message),
            status: HTTP_STATUS.UNAUTHORIZED // Use 401 for token-related errors
          })
        } else {
          // Re-throw unexpected errors to prevent potential security issues
          throw error
        }
      }
    }
  }
}

// Duplicate value
export const checkDuplicateNameValidator = (
  database: Collection<any>
): ValidatorSchemaOptions<'custom'> | undefined => {
  return {
    options: async (value: Languages) => {
      if (!value?.vi && !value?.en) {
        throw new Error(COMMON_MESSAGE.NAME_IS_REQUIRED)
      }
      const normalizedVi = value?.vi
      const normalizedEn = value?.en

      const existingCategory = await database.findOne({
        $or: [{ 'name.vi': normalizedVi, 'name.en': normalizedEn }]
      })

      if (existingCategory) {
        throw new Error(COMMON_MESSAGE.NAME_DUPLICATE)
      }

      return true
    }
  }
}
