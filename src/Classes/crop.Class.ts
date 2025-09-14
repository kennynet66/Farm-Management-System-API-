import { CropModel } from "../Models/crop.Model";
import { ICrop } from "../Types/crop.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";

export class Crop {
    async createCrop(crop: ICrop): Promise<IResponse> {
        try {
            const cropCreated = await CropModel.create(crop);
            return { success: true, message: `Crop added successfully`, data: cropCreated }
        } catch (error) {
            const knownError = iError.GetError(error);
            if(knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: `An unknown error occurred while creating the crop: ${crop.name}` }
        }
    }

    async getCrops(): Promise<IResponse> {
        try {
            const crops = await CropModel.find();

            return { success: true, message: "Success!", data: crops}
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: `An unknown error occurred while creating the crop` }            
        }
    }
}