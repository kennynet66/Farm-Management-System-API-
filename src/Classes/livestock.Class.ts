import { animals } from "../Models/animals";
import { breed } from "../Models/breed";
import { IResponse } from "../Types/global.Types";
import { T_Animal } from "../Types/livestock.Types";
import { iError } from "./error.class";

class Livestock {
    async addLivestock(animal: T_Animal): Promise<IResponse> {
        try {
            const breedExists = await breed.findById(animal.breedId);

            if (!breedExists) {
                return { success: false, message: `Invalid breed ID: ${animal.breedId}` }
            }

            const animalCreated = await animals.create(animal);

            return { success: true, message: `${animalCreated.tagNumber} added successfully!` }
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
            const livestock = await animals.find();

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
            const data = await animals.findById(id);

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