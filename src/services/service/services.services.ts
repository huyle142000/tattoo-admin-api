import databaseService from '../database.services'
import { ObjectId } from 'mongodb'
import { LanguagesRequest } from '~/models/requests/common.request'
import Service from '~/models/schemas/service/Services.schemas'

class Services {
  async postServices(payload: LanguagesRequest) {
    await databaseService.services.insertOne(
      new Service({
        ...payload
      })
    )
    return true
  }

  async getServices(filters?: Partial<LanguagesRequest>): Promise<Service[]> {
    const query = filters ? databaseService.services.find(filters) : databaseService.services.find({})
    const categories = await query.toArray()
    return categories
  }

  async updateService(idService: string, payload: LanguagesRequest) {
    const tattooCtg = await databaseService.services.findOneAndUpdate(
      { _id: new ObjectId(idService) },
      {
        $set: {
          payload
        },
        $currentDate: {
          update_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return tattooCtg
  }

  async deleteServices(payload: ObjectId) {
    await databaseService.services.deleteOne({ _id: payload })
    return true
  }
}

const services = new Services()
export default services
