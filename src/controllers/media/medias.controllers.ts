import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constant/dir'
import { HTTP_STATUS } from '~/constant/https'
import mediasServices from '~/services/media/medias.services'
import fs from 'fs'
import mime from 'mime'

export const uploadImageController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await mediasServices.uploadImage(req)

    return res.json({
      message: 'Successfully registered',
      result
    })
  } catch (error) {
    next(error)
  }
}

export const uploadVideoController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await mediasServices.uploadVideo(req)

    return res.json({
      message: 'Successfully registered',
      result
    })
  } catch (error) {
    next(error)
  }
}

export const uploadVideoHLSController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await mediasServices.uploadVideoHLS(req)

    return res.json({
      message: 'Successfully registered',
      result
    })
  } catch (error) {
    next(error)
  }
}

export const serveImageController = (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params

    return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err: any) => {
      if (err) return res.status(err.status).send('Not found')
    })
  } catch (error) {
    next(error)
  }
}

export const serveVideoStreamController = (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const range = req.headers.range
    if (!range) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range Header')
    }
    const { name } = req.params
    const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)

    const videoSize = fs.statSync(videoPath).size

    const chunkSize = 10 ** 6
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + chunkSize, videoSize - 1)

    const contentLength = end - start + 1
    const contentType = mime.getType(videoPath) || 'video/*'
    const headers = {
      'Content-Range': `bytes${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType
    }
    res.writeHead(HTTP_STATUS.PARIAL_CONTENT, headers)
    const videoSteams = fs.createReadStream(videoPath, { start, end })
    videoSteams.pipe(res)
    return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name), (err: any) => {
      if (err) return res.status(err.status).send('Not found')
    })
  } catch (error) {
    next(error)
  }
}

export const videoStatusController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const result = await mediasServices.getVideoStatus({ id })

    return res.json({
      message: 'Get status video successfully',
      result
    })
  } catch (error) {
    next(error)
  }
}
