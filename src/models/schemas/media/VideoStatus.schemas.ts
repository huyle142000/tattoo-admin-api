import { ObjectId } from 'mongodb'
import { EncodingStatus } from '~/constant/enums'

interface VideoStatusType {
  _id?: ObjectId
  name: string
  status: EncodingStatus
  message?: string
  create_at?: Date
  update_at?: Date
}

export default class VideoStatus {
  _id?: ObjectId
  name: string
  status: EncodingStatus
  message?: string
  create_at?: Date
  update_at?: Date

  constructor(video: VideoStatusType) {
    this._id = video._id
    this.name = video.name || ''
    this.status = video.status || EncodingStatus.Pending
    this.message = video.message || ''
    this.create_at = video.create_at || new Date()
    this.update_at = video.update_at || new Date()
  }
}
