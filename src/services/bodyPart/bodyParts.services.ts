import databaseService from '../database.services'
import { ObjectId } from 'mongodb'
import { LanguagesRequest } from '~/models/requests/common.request'
import BodyPart from '~/models/schemas/bodypart/BodyParts.schemas'

class BodyPartServices {
  async postBodyParts(payload: LanguagesRequest) {
    await databaseService.bodyParts.insertOne(
      new BodyPart({
        ...payload
      })
    )
    return true
  }

  async getBodyParts(filters?: Partial<LanguagesRequest>): Promise<BodyPart[]> {
    console.log(filters, 'filters')
    const query = filters ? databaseService.bodyParts.find(filters) : databaseService.bodyParts.find({})
    const categories = await query.toArray()

    return categories
  }

  async updateBodyPart(idService: string, payload: LanguagesRequest) {
    const tattooCtg = await databaseService.bodyParts.findOneAndUpdate(
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

  async deleteBodyPart(payload: ObjectId) {
    await databaseService.bodyParts.deleteOne({ _id: payload })
    return true
  }
}

const bodyPartsService = new BodyPartServices()
export default bodyPartsService
