import databaseService from '../database.services'
import { ObjectId } from 'mongodb'
import { LanguagesRequest } from '~/models/requests/common.request'
import Unit from '~/models/schemas/unit/Units.schemas'

class UnitServices {
  async postUnits(payload: LanguagesRequest) {
    await databaseService.units.insertOne(
      new Unit({
        ...payload
      })
    )
    return true
  }

  async getUnits(filters?: Partial<LanguagesRequest>): Promise<Unit[]> {
    const query = filters ? databaseService.units.find(filters) : databaseService.units.find({})
    const categories = await query.toArray()
    return categories
  }

  async updateUnit(idService: string, payload: LanguagesRequest) {
    const tattooCtg = await databaseService.units.findOneAndUpdate(
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

  async deleteUnit(payload: ObjectId) {
    await databaseService.units.deleteOne({ _id: payload })
    return true
  }
}

const unitsService = new UnitServices()
export default unitsService
