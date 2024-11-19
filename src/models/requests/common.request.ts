import { ObjectId } from 'mongodb'
import { Languages } from '~/constant/common'

export interface RequestByID {
  id: string
}

export interface LanguageQueriesRequest {
  name: Languages
}

export interface LanguagesRequest {
  _id?: ObjectId
  name: Languages
  description?: Languages
}
