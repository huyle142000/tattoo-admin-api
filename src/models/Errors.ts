import { HTTP_STATUS } from '~/constant/https'
import { USER_MESSAGE } from '~/constant/messages'

type ErrorsMessages = {
  message: string
  status: number
}

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: ErrorsMessages) {
    this.message = message
    this.status = status
  }
}

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType

  constructor({ message = USER_MESSAGE.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
