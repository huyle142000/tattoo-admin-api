import { checkSchema } from 'express-validator'
import { COMMON_MESSAGE, SESSION_MESSAGE, TATTOO_APPOINTMENT_MESSAGE, USER_MESSAGE } from '~/constant/messages'
import { validate } from '~/utils/validation'
import { checkExistentFieldValidator } from '~/middlewares/common.middlewares'
import databaseService from '~/services/database.services'
import { AppointmentStatus, SessionStatus, UserRoles } from '~/constant/enums'
import { ErrorWithStatus } from '~/models/Errors'
import { HTTP_STATUS } from '~/constant/https'
import { verifyToken } from '~/utils/jwt'
import { ObjectId } from 'mongodb'
import { capitalize } from 'lodash'
import { JsonWebTokenError } from 'jsonwebtoken'
import { Request } from 'express'
import SessionAppointment from '~/models/schemas/appointment/SessionAppointments.schemas'

export const checkPostAppointmentRequestsValidator = validate(
  checkSchema(
    {
      email: {
        exists: {
          errorMessage: COMMON_MESSAGE.EMAIL_IS_REQUIRED
        }
      },
      phoneNumber: {
        exists: {
          errorMessage: COMMON_MESSAGE.PHONE_NUMBER_IS_REQUIRED
        }
      },
      tattooId: {
        optional: true,
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.TATTOOID_INVALID
        },
        custom: {
          options: async (value) => {
            if (value) {
              return checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_TATTOO, [databaseService.tattoos])
            }
            return true // Passes validation if `value` is falsy or tattoo exists
          }
        }
      },
      customerId: {
        optional: true,
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.ARTISTID_INVALID
        },
        custom: {
          options: async (value) => {
            if (value) {
              return checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_CUSTOMER, [databaseService.users])
            }
            return true // Passes validation if `value` is falsy or tattoo exists
          }
        }
      },

      artistId: {
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.ARTISTID_INVALID
        },
        custom: checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_ARTIST, [databaseService.users])
      },
      // service: {
      //   exists: {
      //     errorMessage: TATTOO_APPOINTMENT_MESSAGE.SERVICE_IS_REQUIRED
      //   },
      //   custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.SERVICE_IS_INEXISTENT, [
      //     databaseService.services
      //   ])
      // },
      startTime: {
        isISO8601: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.STARTTIME_INVALID
        },
        custom: {
          options: async (value, { req }) => {
            const existingSessions = await databaseService.requestAppointments.find({
              $and: [
                // {
                //   status: SessionStatus.
                // },
                {
                  $or: [
                    {
                      $and: [{ startTime: { $lte: req?.body?.startTime } }, { endTime: { $gte: req?.body?.endTime } }]
                    },
                    {
                      $and: [{ startTime: { $gte: req?.body?.startTime } }, { startTime: { $lt: req?.body?.endTime } }]
                    }
                  ]
                },
                {
                  artist: { $ne: req?.body?.artistId }
                },
                {
                  appointment: { $ne: req?.body?.appointment }
                }
              ]
            })
            console.log(existingSessions, 'existingSessions')
          }
        }
      },
      endTime: {
        isISO8601: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.ENDTIME_INVALID
        }
      },
      isAllDay: {
        optional: true,
        isBoolean: true,
        default: false
      },
      note: {
        optional: true,
        isString: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.DESCRIPTION_STRING
        }
      },
      status: {
        optional: true,
        isIn: {
          options: Object.values(AppointmentStatus),
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.STATUS_INVALID
        }
      }
    },
    ['body']
  )
)
// consultant-appointment
export const checkPostConsultantAppointmentsValidator = validate(
  checkSchema(
    {
      tattoo: {
        optional: true,

        custom: checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_TATTOO, [databaseService.tattoos])
      },

      customer: {
        optional: true,

        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.CUSTOMER_IS_INEXISTENT, [databaseService.users])
      },
      artist: {
        optional: true,

        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.ARTIST_IS_INEXISTENT, [databaseService.users])
      },
      service: {
        optional: true,

        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.SERVICE_IS_INEXISTENT, [
          databaseService.services
        ])
      },
      note: {
        optional: true,
        isString: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.DESCRIPTION_STRING // Assuming 'note' is for description
        }
      },
      status: {
        optional: true
      }
    },
    ['body']
  )
)

// tattoo-appointment
export const checkPostTattooAppointmentsValidator = validate(
  checkSchema(
    {
      tattoo: {
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.TATTOOID_INVALID
        },
        custom: checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_TATTOO, [databaseService.tattoos])
      },

      customer: {
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.CUSTOMER_IS_REQUIRED
        },
        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.CUSTOMER_IS_INEXISTENT, [databaseService.users])
      },
      artist: {
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.ARTISTID_REQUIRED
        },
        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.ARTIST_IS_INEXISTENT, [databaseService.users])
      },
      service: {
        exists: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.SERVICE_IS_REQUIRED
        },
        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.SERVICE_IS_INEXISTENT, [
          databaseService.services
        ])
      },
      note: {
        optional: true,
        isString: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.DESCRIPTION_STRING // Assuming 'note' is for description
        }
      },
      status: {
        optional: true,
        isIn: {
          options: Object.values(AppointmentStatus), // Assuming AppointmentStatus is an enum
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.STATUS_INVALID
        }
      }
    },
    ['body']
  )
)

// session-appointment
export const checkPostSessionAppointmentsValidator = validate(
  checkSchema(
    {
      appointment: {
        optional: true,
        custom: checkExistentFieldValidator(TATTOO_APPOINTMENT_MESSAGE.APPOINTMENT_IS_INEXISTENT, [
          databaseService.consultancyAppointments
        ])
      },
      artist: {
        optional: true,

        custom: checkExistentFieldValidator(COMMON_MESSAGE.INEXISTENT_ARTIST, [databaseService.users])
      },
      startTime: {
        optional: true,

        isISO8601: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.STARTTIME_INVALID
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const currentDate = new Date()
              const startTime = new Date(req?.body?.startTime)
              const endTime = new Date(req?.body?.endTime)
              console.log(startTime, 'startTime')
              console.log(currentDate, 'currentDate')

              if (startTime.getTime() < currentDate.getTime() || endTime.getTime() < currentDate.getTime()) {
                throw new ErrorWithStatus({
                  message: TATTOO_APPOINTMENT_MESSAGE.TIME_IS_IN_PAST,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
              if (endTime.getTime() <= startTime.getTime()) {
                throw new ErrorWithStatus({
                  message: TATTOO_APPOINTMENT_MESSAGE.STARTIME_IS_EARLIER_THAN_ENDTIME,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
              const existingSessions = await databaseService.sessionAppointments
                .find({
                  $and: [
                    { status: { $ne: SessionStatus.Cancelled && SessionStatus.Rescheduled } },
                    {
                      $or: [
                        {
                          $and: [
                            { startTime: { $lte: req?.body?.startTime } },
                            { endTime: { $gte: req?.body?.endTime } }
                          ]
                        },
                        {
                          $and: [
                            { startTime: { $gte: req?.body?.startTime } },
                            { startTime: { $lt: req?.body?.endTime } }
                          ]
                        }
                      ]
                    },
                    {
                      artist: req?.body?.artist
                    }
                  ]
                })
                .toArray()
              if (existingSessions?.length > 0) {
                throw new ErrorWithStatus({
                  message: TATTOO_APPOINTMENT_MESSAGE.START_END_TIME_DUPLICATED,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }

              const findSessionsOfAppointment = await databaseService.sessionAppointments
                .find({
                  appointment: req?.body?.appointment
                })
                ?.toArray()
              let checkValidStatusLastestSession = false
              await findSessionsOfAppointment?.map((session: SessionAppointment) => {
                if (session?.status == SessionStatus.Completed || session?.status == SessionStatus.Cancelled) {
                  checkValidStatusLastestSession = true
                }
              })
              if (!checkValidStatusLastestSession && findSessionsOfAppointment?.length > 0) {
                throw new ErrorWithStatus({
                  message: SESSION_MESSAGE.PREVIOUS_SESSION_HAS_NOT_COMPLETED_YET_OR_BEEN_CANCELED,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
            } catch (error) {
              console.log(error, 'error')
              throw error
            }
            return true
          }
        }
      },
      endTime: {
        optional: true,

        isISO8601: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.ENDTIME_INVALID
        }
      },
      note: {
        optional: true,
        isString: {
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.DESCRIPTION_STRING // Assuming 'note' is for description
        }
      },
      status: {
        optional: true
      }
    },
    ['body']
  )
)

// appointment-status
export const checkAppointmentStatusValidator = validate(
  checkSchema(
    {
      status: {
        isIn: {
          options: Object.values(AppointmentStatus), // Assuming AppointmentStatus is an enum
          errorMessage: TATTOO_APPOINTMENT_MESSAGE.STATUS_INVALID
        },
        custom: {
          options: async (value) => {
            if (value != AppointmentStatus.Confirmed) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: TATTOO_APPOINTMENT_MESSAGE.INVALID_TATTOO_STATUS
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

// Artist
export const checkAdminOrArtistAccessTokenValidator = validate(
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

            //Check role
            const acceptedRole = [UserRoles.Admin, UserRoles.Artist]
            if (!acceptedRole.includes(decode_authorization?.role)) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.USER_IS_NOT_ALLOWED,
                status: HTTP_STATUS.FORBIDDEN
              })
            }
            const params = req.params?.id
            if (decode_authorization?.role == UserRoles.Artist && params) {
              const findArtistInTattooApp = await databaseService.tattooAppointments.findOne({
                _id: params,
                artist: new ObjectId(decode_authorization.user_id)
              })
              const findArtistInConsultantApp = await databaseService.consultancyAppointments.findOne({
                _id: params,
                artist: new ObjectId(decode_authorization.user_id)
              })
              if (!findArtistInTattooApp && !findArtistInConsultantApp) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.USER_IS_NOT_ALLOWED,
                  status: HTTP_STATUS.FORBIDDEN
                })
              }
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

// Session
export const checkSessionAccessTokenValidator = validate(
  checkSchema({
    Authorization: {
      trim: true,
      custom: {
        options: async (value: string, { req }) => {
          const access_token = await (value || '')?.split('Bearer ')[1]
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
            //Check role
            const acceptedRole = [UserRoles.Admin, UserRoles.Artist]
            if (!acceptedRole.includes(decode_authorization?.role)) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.USER_IS_NOT_ALLOWED,
                status: HTTP_STATUS.FORBIDDEN
              })
            }
            const params = req.params?.id
            if (UserRoles.Artist && params) {
              const findArtistInTattooApp = await databaseService.tattooAppointments.findOne({
                _id: params,
                artist: new ObjectId(decode_authorization.user_id)
              })
              const findArtistInConsultantApp = await databaseService.consultancyAppointments.findOne({
                _id: params,
                artist: new ObjectId(decode_authorization.user_id)
              })
              if (!findArtistInTattooApp && !findArtistInConsultantApp) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.USER_IS_NOT_ALLOWED,
                  status: HTTP_STATUS.FORBIDDEN
                })
              }
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
          return true
        }
      }
    }
  })
)
