import { EncodingStatus, MediaType } from '~/constant/enums'
import dotenv from 'dotenv'
import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constant/dir'

import path from 'path'
import fs from 'fs'
import fsPromise from 'fs/promises'

import { isProduction } from '~/constant/config'
import { Media } from '~/models/Others'
import {
  encodeHLSWithMultipleVideoStreams,
  getNameFromFullName,
  handleUploadImage,
  handleUploadVideo
} from '~/utils/file'
import databaseService from '../database.services'
import VideoStatus from '~/models/schemas/media/VideoStatus.schemas'

dotenv.config()

class Queue {
  items: string[]
  encoding: boolean
  constructor() {
    this.items = []
    this.encoding = false
  }

  enqueue(item: string) {
    this.items.push(item)
    const idName = getNameFromFullName(item.split('/').pop() as string)
    databaseService.videostatus.insertOne(
      new VideoStatus({
        name: idName,
        status: EncodingStatus.Pending
      })
    )
    this.processEncode()
  }

  async processEncode() {
    if (this.encoding) return
    if (this.items.length > 0) {
      const videoPath = this.items[0]
      const idName = getNameFromFullName(videoPath.split('/').pop() as string)

      await databaseService.videostatus.updateOne(
        { name: idName },
        {
          $set: {
            status: EncodingStatus.Success
          },
          $currentDate: {
            update_at: true
          }
        }
      )

      try {
        await encodeHLSWithMultipleVideoStreams(videoPath)
        this.items.shift()
        await fsPromise.unlink(videoPath)
      } catch (error) {
        await databaseService.videostatus
          .updateOne(
            { name: idName },
            {
              $set: {
                status: EncodingStatus.Failed
              },
              $currentDate: {
                update_at: true
              }
            }
          )
          .catch((err) => {
            console.log(err)
          })
      }
      this.processEncode()
    } else {
      console.log('encodeVideo')
    }
  }
}

const queue = new Queue()

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const results: Media[] = await Promise.all(
      files.map(async (file: any) => {
        const newName = getNameFromFullName(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filespath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filespath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jqg`
            : `http://localhost:3000/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return results
  }
  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const { newFilename } = files[0]
    return {
      url: isProduction
        ? `${process.env.HOST}/static/video/${newFilename}.jqg`
        : `http://localhost:3000/static/video/${newFilename}.jpg`,
      type: MediaType.Video
    }
  }
  async uploadVideoHLS(req: Request) {
    const files = await handleUploadVideo(req)
    const results: Media[] = await Promise.all(
      files.map(async (file: any) => {
        const newName = getNameFromFullName(file.newFilename)
        // await encodeHLSWithMultipleVideoStreams(file.filePath)
        // await fsPromise.unlink(file.filePath)
        queue.enqueue(file.filePath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/video-hls /${newName}.jqg`
            : `http://localhost:3000/static/video-hls /${newName}.jpg`,
          type: MediaType.HLS
        }
      })
    )

    return results
  }
  async getVideoStatus({ id }: { id: string }) {
    const data = await databaseService.videostatus.findOne({ name: id })

    return data
  }
}

const mediasServices = new MediasService()
export default mediasServices
