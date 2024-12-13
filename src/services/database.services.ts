import dotenv from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import RefreshToken from '~/models/schemas/refreshToken/RefreshToken.schemas'
import TattooCategory from '~/models/schemas/tattoo/TattooCategories.schemas'
import Tattoo from '~/models/schemas/tattoo/Tattoos.schemas'
import User from '~/models/schemas/user/Users.schemas'
import VideoStatus from '~/models/schemas/media/VideoStatus.schemas'
import Service from '~/models/schemas/service/Services.schemas'
import Unit from '~/models/schemas/unit/Units.schemas'
import BodyPart from '~/models/schemas/bodypart/BodyParts.schemas'
import RequestAppointment from '~/models/schemas/appointment/RequestAppointments.schemas'
import SessionAppointment from '~/models/schemas/appointment/SessionAppointments.schemas'
import ConsultancyAppointment from '~/models/schemas/appointment/ConsultancyAppointments.schemas'
import TattooAppointment from '~/models/schemas/appointment/TattooAppointments.schemas'
import Inventories from '~/models/schemas/inventory/Inventories.schemas'
import InventoryCtgs from '~/models/schemas/inventory/ItemInventoryCategories'

dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tattoosever.sript8i.mongodb.net/?retryWrites=true&w=majority&appName=TattooSever`
export class DatabaseService {
  private customer: MongoClient
  private db: Db
  constructor() {
    this.customer = new MongoClient(uri)
    this.db = this.customer.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      console.log(123123)
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      // Ensures that the customer will close when you finish/error
      console.log(err, 'err')
    }
  }

  async indexUsers() {
    const exists = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])
    if (!exists) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 })
    }
  }
  async indexRefreshTokens() {
    const exists = await this.users.indexExists(['exp_1', 'token', 'username_1'])
    if (!exists) {
      this.refreshTokens.createIndex({ token: 1 })
      this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.USER_COLLECTION as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  get tattooCategories(): Collection<TattooCategory> {
    return this.db.collection(process.env.DB_TATTOO_CTGS_COLLECTION as string)
  }

  get tattoos(): Collection<Tattoo> {
    return this.db.collection(process.env.DB_TATTOO_COLLECTION as string)
  }

  get inventories(): Collection<Inventories> {
    return this.db.collection(process.env.DB_INVENTORY_COLLECTION as string)
  }

  get inventoryCtgs(): Collection<InventoryCtgs> {
    return this.db.collection(process.env.DB_INVENTORY_COLLECTION as string)
  }

  get videostatus(): Collection<VideoStatus> {
    return this.db.collection(process.env.DB_VIDEOSTATUS_COLLECTION as string)
  }

  get services(): Collection<Service> {
    return this.db.collection(process.env.DB_SERVICE_COLLECTION as string)
  }

  get units(): Collection<Unit> {
    return this.db.collection(process.env.DB_UNIT_COLLECTION as string)
  }

  get bodyParts(): Collection<BodyPart> {
    return this.db.collection(process.env.DB_BODYPART_COLLECTION as string)
  }

  // appointment
  get requestAppointments(): Collection<RequestAppointment> {
    return this.db.collection(process.env.DB_REQUEST_APPOINTMENT_COLLECTION as string)
  }
  get consultancyAppointments(): Collection<ConsultancyAppointment> {
    return this.db.collection(process.env.DB_CONSULTANCY_APPOINTMENT_COLLECTION as string)
  }
  get tattooAppointments(): Collection<TattooAppointment> {
    return this.db.collection(process.env.DB_TATTOO_APPOINTMENT_COLLECTION as string)
  }
  get sessionAppointments(): Collection<SessionAppointment> {
    return this.db.collection(process.env.DB_SESSION_APPOINTMENT_COLLECTION as string)
  }
  // get cronJobs(): Collection<CronJob> {
  //   return this.db.collection(process.env.DB_CRON_JOB_COLLECTION as string)
  // }
}

const databaseService = new DatabaseService()

export default databaseService
