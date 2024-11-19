import TattooCategory from '~/models/schemas/tattoo/TattooCategories.schemas'
import databaseService from '../database.services'
import { PostTattooCategoriesRequest, TattooCategoriesRequest } from '~/models/requests/Tattoos.request'
import { ObjectId } from 'mongodb'

class TattoosCtgsService {
  async postCategories(payload: PostTattooCategoriesRequest) {
    const result = await databaseService.tattooCategories.insertOne(
      new TattooCategory({
        ...payload
      })
    )
    return result
  }

  async getCategories(filters?: Partial<TattooCategoriesRequest>): Promise<TattooCategory[]> {
    const query = filters ? databaseService.tattooCategories.find(filters) : databaseService.tattooCategories.find({})
    const categories = await query.toArray()
    return categories
  }

  async updateCategory(idCategory: string, payload: PostTattooCategoriesRequest) {
    const tattooCtg = await databaseService.tattooCategories.findOneAndUpdate(
      { _id: new ObjectId(idCategory) },
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

  async deleteCategories(payload: ObjectId) {
    await databaseService.tattooCategories.deleteOne({ _id: payload })
    return true
  }
}

const tattooCtgsServices = new TattoosCtgsService()
export default tattooCtgsServices
