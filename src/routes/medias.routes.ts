import { Router } from 'express'
import { uploadImageController } from '~/controllers/media/medias.controllers'

import { checkAdminAccessTokenValidator } from '~/middlewares/common.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const mediasRouter = Router()

mediasRouter.post('/image/:id/tattoo', checkAdminAccessTokenValidator, wrapRequestHandler(uploadImageController))

// mediasRouter.post(
//   '/upload-video',
//   accessTokenValidator,
//   verifiedUserValidator,
//   wrapRequestHandler(uploadVideoController)
// )

// mediasRouter.post(
//   '/upload-video-hls',
//   accessTokenValidator,
//   verifiedUserValidator,
//   wrapRequestHandler(uploadVideoHLSController)
// )

// mediasRouter.get(
//   '/video-status/:id',
//   accessTokenValidator,
//   verifiedUserValidator,
//   wrapRequestHandler(videoStatusController)
// )

export default mediasRouter
