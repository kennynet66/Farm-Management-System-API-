import { Request, Response } from "express";
import { ICrop } from "../Types/crop.Types";
import { Crop } from "../Classes/crop.Class";

const crop = new Crop();

export class cropController {
    async createCrop(req: Request, res: Response) {
        try {
            const cropDetails: ICrop = req.body;
            const cropCreated = await crop.createCrop(cropDetails);

            if (!cropCreated.success) {
                return res.status(400).json({
                    success: false,
                    message: cropCreated.message
                })
            }
            return res.status(200).json({
                success: true,
                message: `${cropCreated.data.name} created successfully!`
            });
        } catch (error) {
            throw Error(`An error occurred while creating a crop ${error}`)
        }
    }

    async getCrops(req: Request, res: Response) {
        try {
            const fetchCrops = await crop.getCrops();
            return res.status(200).json({ success: true, Crops: fetchCrops.data });
        } catch (error) {
            throw Error(`An error occurred while getting crops:\n ${error}`);
        }
    };
}