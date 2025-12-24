import { Animal } from "../entity/animal.Entity";
import { AnimalBreed } from "../entity/animalBreed";
import { animals } from "../Models/animals";
import { IResponse } from "../Types/global.Types";
import { T_Animal } from "../Types/livestock.Types";
import { iError } from "./error.class";

class Livestock {
    async addLivestock(animal: T_Animal): Promise<IResponse> {
        try {
            const breedExists = await AnimalBreed.findOne({ where: { id: animal.breedId } });

            if (!breedExists) {
                return { success: false, message: `Invalid breed ID: ${animal.breedId}`, data: [] }
            }

            const newAnimal = Animal.create({
                tagNumber: animal.tagNumber,
                sex: animal.sex,
                birthDate: animal.birthDate,
                weight: animal.weight,
                status: animal.status,
                notes: animal.notes,
                breed: breedExists
            });

            await newAnimal.save();

            return { success: true, message: `${newAnimal.tagNumber} added successfully!`, data: [] }
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message, data: [] }
            }
            throw Error(`An unknown error occurred while adding livestock ${error}`);
        }
    }

    async getLivestock(): Promise<IResponse> {
        try {
            const livestock = await Animal.find()

            return { success: false, message: "Success!", data: livestock };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message, data: [] }
            }
            throw Error(`An unkown error occurred while fetching livestock ${error}`);
        }
    }

    async getLivestockById(id: string): Promise<IResponse> {
        try {
            const data = await Animal.findOne({ where: { id: id } });

            return { success: true, message: "Success!", data: [data] };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message, data: [] }
            }
            throw Error(`An unkown error occurred while fetching livestock ${error}`);
        }
    }
}

export const livestock = new Livestock();