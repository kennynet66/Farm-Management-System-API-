import { Request, Response } from "express";
import { T_Farm } from "../Types/farm.Types";
import { farmClass } from "../Classes/farm.Class";
import { ExtendedUserRequest, RoleLevels } from "../Types/auth.Types";
export class FarmController {
    async createFarm(req: Request, res: Response) {
        try {
            const farmDetails: T_Farm = req.body;

            const farmCreated = await farmClass.createFarm(farmDetails);

            if (!farmCreated.success) {
                return res.status(400).json({ ...farmCreated });
            }
            return res.status(200).json({ ...farmCreated });

        } catch (error) {
            throw Error(`An unknown error occurred while adding a farm ${error}`);
        }
    }

    async getFarms(req: ExtendedUserRequest, res: Response) {
        try {
            const reqUserRole = req.role as RoleLevels;
            const reqUserId = req.userId as string;
            const farms = await farmClass.getFarms(reqUserRole, reqUserId);

            return res.status(200).json({ ...farms });
        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }

    async getFarmById(req: ExtendedUserRequest, res: Response) {
        try {
            const farmId = req.params.id;
            const reqUserRole = req.role as RoleLevels;
            const reqUserId = req.userId as string;
            const farms = await farmClass.getFarmById(reqUserRole, farmId, reqUserId);

            return res.status(200).json({ ...farms });
        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }
}