import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const OAuth2 = google.auth.OAuth2
export const createTransporter = async () => {
  console.log(132412341234)
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject()
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }
  })

  return transporter
}
