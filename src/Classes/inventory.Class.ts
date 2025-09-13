import { InventoryModel } from "../Models/inventory.Model";
import { IResponse } from "../Types/global.Types";
import { IInventoryItem } from "../Types/inventory.Type";
import { IError } from "./error.class";

const handleError = new IError()

export class Inventory {
    async createInventoryItem(inventoryItem: IInventoryItem): Promise<IResponse> {
        try {
            
            const itemCreated = await InventoryModel.create(inventoryItem);

            return { success: true, message: "Item created successfully" };
        } catch (error) {
            const knownError = handleError.GetError(error)

            if(knownError.success) {
                return { success: false, message: knownError.message }
            }

            return { success: false, message: `An unknown error occurred while creating an inventory item \n${error}`}
        }
    }

    async getInventoryItems(): Promise<IResponse> {
        try {
            const items = await InventoryModel.find();

            return { success: true, message: "Success!", data: items };
        } catch (error) {
            const knownError = handleError.GetError(error)

            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            return { success: false, message: `An unknown error occurred while fetching inventory items \n${error}` }
        }
    }
    
    async getInventoryItem(id: string): Promise<IResponse> {
        try {
            const item = await InventoryModel.findById(id);

            return { success: true, message: "Success!", data: item };
        } catch (error) {
            const knownError = handleError.GetError(error)

            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            return { success: false, message: `An unknown error occurred while fetching inventory item \n${error}` }
        }
    }
}