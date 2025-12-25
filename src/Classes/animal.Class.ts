import { Animal } from "../entity/animal.Entity";
import { IResponse } from "../Types/global.Types";
import { T_Animal } from "../Types/livestock.Types";

class AnimalClass {
    async addAnimal(animalDetails: T_Animal): Promise<IResponse> {
        try {
            const newAnimal = Animal.create({ ...animalDetails });

            newAnimal.save();

            return { success: true, message: "Unhandled error!", data: [] };
        } catch (error) {
            console.error(`[Class]: ${error}`);
            return { success: false, message: "Unhandled error!", data: [] };
        }
    };

    async fetchAnimals(): Promise<IResponse> {
        try {
            const animal = await Animal.find();

            return { success: true, message: "Ok!", data: animal };
        } catch (error) {
            console.error(`[Class]: ${error}`);
            return { success: false, message: "Unhandled error!", data: [] };
        }
    };
}

export const animalClass = new AnimalClass();