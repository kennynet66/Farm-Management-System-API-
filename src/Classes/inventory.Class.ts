import { moneyFormatter } from "../Formatters/money.Formatter";
import { InventoryModel } from "../Models/inventory.Model";
import { IResponse } from "../Types/global.Types";
import { IInventoryItem } from "../Types/inventory.Type";
import { iError } from "./error.class";

export class Inventory {
    async createInventoryItem(inventoryItem: IInventoryItem): Promise<IResponse> {
        try {

            const itemCreated = await InventoryModel.create(inventoryItem);

            return { success: true, message: "Item created successfully" };
        } catch (error) {
            const knownError = iError.GetError(error)

            if (knownError.success) {
                return { success: false, message: knownError.message }
            }

            return { success: false, message: `An unknown error occurred\n${error}` }
        }
    }

    async getInventoryItems(): Promise<IResponse> {
        try {
            const Items = await InventoryModel.find();
            const lowStockItems = await this.getLowStockItemsCount();
            const totalInventoryItems = await this.getTotalInventoryItemsCount();
            const inventoryItemsCountByCategory = await this.getInventoryItemsCountByCategory()
            const totalValue = await this.getInventoryTotalValue();
            const formattedTotalValue = moneyFormatter.formatKES(totalValue[0].totalValue)

            return { success: true, message: "Success!", data: { Items, lowStockItems, totalInventoryItems, inventoryItemsCountByCategory, totalValue: formattedTotalValue } };
        } catch (error) {
            const knownError = iError.GetError(error)

            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            return { success: false, message: `An unknown error occurred \n${error}` }
        }
    }

    async getInventoryItem(id: string): Promise<IResponse> {
        try {
            const item = await InventoryModel.findById(id);

            return { success: true, message: "Success!", data: item };
        } catch (error) {
            const knownError = iError.GetError(error)

            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            return { success: false, message: `An unknown error occurred \n${error}` }
        }
    }

    async deleteInventoryItemById(id: string[]): Promise<IResponse> {
        try {
            const itemDeleted = await InventoryModel.deleteMany({ _id: id })

            return { success: true, message: "Success!" };
        } catch (error) {
            const knownError = iError.GetError(error)

            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            return { success: false, message: `An unknown error occurred \n${error}` }
        }
    }

    async getLowStockItemsCount(): Promise<number> {
        try {
            const count = await InventoryModel.countDocuments({
                $expr: { $lte: ["$currentStock", "$minStock"] }
            })
            return count
        } catch (error) {
            return 0
        }
    }

    async getTotalInventoryItemsCount(): Promise<number> {
        try {
            const count = await InventoryModel.countDocuments();
            return count
        } catch (error) {
            return 0
        }
    }

    async getInventoryTotalValue(): Promise<{ _id: string | null, totalValue: number }[]> {
        try {
            const pipeline = [{
                $group: {
                    _id: null,
                    totalValue: { $sum: "$value" }
                }
            }]
            const count = await InventoryModel.aggregate(pipeline);
            return count;
        } catch (error) {
            return [{ _id: null, totalValue: 0 }];
        }
    }

    async getInventoryItemsCountByCategory(): Promise<{ _id: string | null, count: number }[]> {
        try {
            const pipeline = [{
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }]
            const count = await InventoryModel.aggregate(pipeline);
            return count;
        } catch (error) {
            return [{ _id: null, count: 0 }];
        }
    }
}