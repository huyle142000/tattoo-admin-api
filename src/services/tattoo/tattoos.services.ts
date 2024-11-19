import { ObjectId } from 'mongodb'
import databaseService from '../database.services'
import { PostTattoosRequest, TattoosQueryRequest } from '~/models/requests/Tattoos.request'
import Tattoo from '~/models/schemas/tattoo/Tattoos.schemas'

class TattoosService {
  async postTattoo(payload: PostTattoosRequest) {
    await databaseService.tattoos.insertOne(
      new Tattoo({
        ...payload
      })
    )
    return true
  }

  async getTattoos(filters?: Partial<TattoosQueryRequest>): Promise<Tattoo[]> {
    const query = filters
      ? databaseService.tattoos.find({
          ...filters,
          $or: [{ 'name.vi': filters?.name?.vi, 'name.en': filters?.name?.en }]
        })
      : databaseService.tattoos.find({})
    const tattoos = await query.toArray()
    return tattoos
  }

  async deleteTattoo(payload: ObjectId) {
    await databaseService.tattoos.deleteOne({ _id: payload })
    return true
  }

  async updateTattoo(idTattoo: string, payload: PostTattoosRequest) {
    const tattoo = await databaseService.tattoos.findOneAndUpdate(
      { _id: new ObjectId(idTattoo) },
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
    return tattoo
  }
}

const tattoosServices = new TattoosService()
export default tattoosServices
