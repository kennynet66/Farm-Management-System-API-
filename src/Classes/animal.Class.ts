import { Animal } from "../entity/animal.Entity";
import { IResponse } from "../Types/global.Types";
import { T_Animal } from "../Types/livestock.Types";

class AnimalClass {
    async addAnimal(animalDetails: T_Animal): Promise<IResponse> {
        try {
            const newAnimal = Animal.create({ ...animalDetails });

            const animalCreated = await newAnimal.save();

            if (!animalCreated) return { success: false, message: animalCreated, data: [] };

            return { success: true, message: "Animal added successfully", data: [] };
        } catch (error) {
            console.error(`[Class]: ${error}`);
            return { success: false, message: "Unhandled error!", data: [error] };
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

    async deleteAnimals(animals: string[]) {
        try {
            console.log(typeof animals);
            if (animals.length <= 0) return { success: false, message: "Animals cannot be empty", data: [] };
            await Animal.delete(animals);
            return { success: true, message: `${animals.length} item(s) deleted successfully`, data: [] };
        } catch (error) {
            console.error(`[Class]: ${error}`);
            return { success: false, message: "Unhandled error!", data: [] };
        }
    };
}

export const animalClass = new AnimalClass();