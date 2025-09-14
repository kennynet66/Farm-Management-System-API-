import { livestockModel } from "../Models/livestock.Model";
import { IResponse } from "../Types/global.Types";
import { T_Animal } from "../Types/livestock.Types";
import { iError } from "./error.class";

class Livestock {
    async addLivestock(animal: T_Animal): Promise<IResponse> {
        try {
            const animalCreated = await livestockModel.create(animal);

            return { success: true, message: `${animalCreated.name} created successfully!` }
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            throw Error(`An unknown error occurred while adding livestock ${error}`);
        }
    }

    async getLivestock(): Promise<IResponse> {
        try {
            const livestock = await livestockModel.find();

            return { success: false, message: "Success!", data: livestock };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            throw Error(`An unkown error occurred while fetching livestock ${error}`);
        }
    }

    async getLivestockById(id: string): Promise<IResponse> {
        try {
            const data = await livestockModel.findById(id);

            return { success: true, message: "Success!", data };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message }
            }
            throw Error(`An unkown error occurred while fetching livestock ${error}`);
        }
    }
}

export const livestock = new Livestock();