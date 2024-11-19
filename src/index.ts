import express from 'express'
import rootRoutes from './routes/root.routes'
// Decode ENV
import { config } from 'dotenv'
import databaseService from './services/database.services'
config()

const app = express()
app.use(express.json())
const port = process.env.PORT
databaseService.connect().then(() => {
  // databaseService.indexUsers()
  // databaseService.indexRefreshTokens()
})

//routes
rootRoutes(app)

//
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
