import databaseService from '../database.services'
import { ObjectId } from 'mongodb'
import { LanguagesRequest } from '~/models/requests/common.request'
import {
  GetInventoriesRequest,
  GetInventoryCtgsRequest,
  PostInventoriesRequest,
  PostInventoryCtgsRequest,
  UpdateInventoriesRequest,
  UpdateInventoryCtgsRequest
} from '~/models/requests/Inventories.request'
import Inventories from '~/models/schemas/inventory/Inventories.schemas'
import InventoryCtgs from '~/models/schemas/inventory/ItemInventoryCategories'

class InventoriesServices {
  async postInventory(payload: PostInventoriesRequest) {
    await databaseService.inventories.insertOne(
      new Inventories({
        ...payload
      })
    )
    return true
  }

  async getInventories(filters?: Partial<GetInventoriesRequest>): Promise<Inventories[]> {
    console.log(filters, 'filters')
    const query = filters ? databaseService.inventories.find(filters) : databaseService.inventories.find({})
    const results = await query.toArray()

    return results
  }

  async updateInventory(idService: string, payload: UpdateInventoriesRequest) {
    const tattooCtg = await databaseService.inventories.findOneAndUpdate(
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

  async deleteInventory(payload: ObjectId) {
    await databaseService.inventories.deleteOne({ _id: payload })
    return true
  }

  async postInventoryCtgs(payload: PostInventoryCtgsRequest) {
    await databaseService.inventoryCtgs.insertOne(
      new InventoryCtgs({
        ...payload
      })
    )
    return true
  }

  async getInventoryCtgs(filters?: Partial<GetInventoryCtgsRequest>): Promise<InventoryCtgs[]> {
    console.log(filters, 'filters')
    const query = filters ? databaseService.inventoryCtgs.find(filters) : databaseService.inventoryCtgs.find({})
    const results = await query.toArray()

    return results
  }

  async updateInventoryCtgs(idService: string, payload: UpdateInventoryCtgsRequest) {
    const tattooCtg = await databaseService.inventoryCtgs.findOneAndUpdate(
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

  async deleteInventoryCtgs(payload: ObjectId) {
    await databaseService.inventoryCtgs.deleteOne({ _id: payload })
    return true
  }
}

const inventoriesService = new InventoriesServices()
export default inventoriesService
