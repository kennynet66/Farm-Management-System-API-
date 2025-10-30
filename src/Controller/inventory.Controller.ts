import { NextFunction, Request, Response } from "express";
import { Inventory } from "../Classes/inventory.Class";
import { IInventoryItem } from "../Types/inventory.Type";

const inventory = new Inventory();

export class InventoryController {
    constructor() { }

    async createInventoryItem(req: Request, res: Response, next: NextFunction) {
        try {
            const inventoryDetails: IInventoryItem = req.body;
            const itemCreated = await inventory.createInventoryItem(inventoryDetails);

            if (!itemCreated.success) {
                return res.status(400).json({
                    success: false,
                    message: itemCreated.message
                })
            }
            return res.status(200).json({
                success: true,
                message: itemCreated.message
            })
        } catch (error) {
            throw Error(`An unknown error occurred while creating an inventory item: \n${error} `)
        }
    }

    async getInventoryItems(req: Request, res: Response) {
        try {
            const itemsFetched = await inventory.getInventoryItems();
            if (!itemsFetched.success) {
                return res.status(400).json({
                    success: false,
                    message: itemsFetched.message
                })
            }
            return res.status(200).json({
                success: true,
                message: itemsFetched.message,
                ...itemsFetched.data
            });
        } catch (error) {
            throw Error(`An unknown error occurred while getting inventory items: \n ${error}`);
        }
    }

    async deleteInventoryItemById(req: Request, res: Response) {
        try {
            const id = req.body.id;

            await inventory.deleteInventoryItemById(id);
            return res.status(200).json({
                success: true,
                message: "Item deleted successfully"
            })
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async getInventoryItem(req: Request, res: Response) {
        try {
            const id = req.params.id || ""
            const itemFetched = await inventory.getInventoryItem(id);
            return res.status(200).json({
                success: true,
                message: itemFetched.message,
                Item: itemFetched.data
            });
        } catch (error) {
            throw Error(`An unknown error occurred while getting inventory item: \n ${error}`);
        }
    }
}