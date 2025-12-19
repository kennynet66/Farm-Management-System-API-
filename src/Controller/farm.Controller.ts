import { Request, Response } from "express";
import { T_Farm } from "../Types/farm.Types";
import { farmClass } from "../Classes/farm.Class";
export class FarmController {
    async createFarm(req: Request, res: Response) {
        try {
            const farmDetails: T_Farm = req.body;

            const farmCreated = await farmClass.createFarm(farmDetails);

            if (!farmCreated.success) {
                return res.status(400).json({ success: farmCreated.success, message: farmCreated.message, data: farmCreated.data });
            }
            return res.status(200).json({ success: farmCreated.success, message: farmCreated.message, data: farmCreated.data });

        } catch (error) {
            throw Error(`An unknown error occurred while adding a farm ${error}`);
        }
    }

    async getFarms(req: Request, res: Response) {
        try {
            const farms = await farmClass.getFarms();

            return res.status(200).json({ success: farms.success, message: farms.message, data: farms.data });
        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }

    async getFarmById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const farms = await farmClass.getFarmById(id);

            return res.status(200).json({ success: farms.success, message: farms.message, data: farms.data });
        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }
}