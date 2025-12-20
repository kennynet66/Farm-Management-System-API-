import { Request, Response } from "express";
import { T_Animal } from "../Types/livestock.Types";
import { livestock } from "../Classes/livestock.Class";

export class LivestockController {
    async addLivestock(req: Request, res: Response) {
        try {
            const animalDetails: T_Animal = req.body;
            const animalCreated = await livestock.addLivestock(animalDetails);
            if (!animalCreated.success) {
                return res.status(400).json({ ...animalCreated });
            }
            return res.status(201).json({ ...animalCreated });
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async fetchLivestock(req: Request, res: Response) {
        try {
            const Livestock = await livestock.getLivestock();

            return res.status(200).json({ ...Livestock });
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }
    async fetchLivestockById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const Livestock = await livestock.getLivestockById(id);
            if (!Livestock.success) return res.status(200).json({ message: Livestock.message });
            return res.status(200).json({ ...Livestock });
        } catch (error) {
            throw Error(`An unknown error occurred ${error}`);
        }
    }
}