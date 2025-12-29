import { Animal } from "../entity/animal.Entity";
import { AnimalBreed } from "../entity/animalBreed";
import { Farms } from "../entity/farm.Entity";
import { RoleLevels } from "../Types/auth.Types";
import { IResponse } from "../Types/global.Types";
import { T_Animal } from "../Types/livestock.Types";

class AnimalClass {
    async addAnimal(animalDetails: T_Animal): Promise<IResponse> {
        try {
            const getAnimalBreed = await AnimalBreed.findOneBy({ id: animalDetails.breedId });
            if (!getAnimalBreed) return { success: false, message: "Invalid breed id", data: [] };

            const getAnimalFarm = await Farms.findOneBy({ id: animalDetails.farm });
            if (!getAnimalFarm) return { success: false, message: "Invalid farm id", data: [] };
            const newAnimal = Animal.create({ ...animalDetails, breed: getAnimalBreed, farm: getAnimalFarm });

            const animalCreated = await newAnimal.save();

            if (!animalCreated) return { success: false, message: animalCreated, data: [] };

            return { success: true, message: "Animal added successfully", data: [] };
        } catch (error) {
            console.error(`[Class]: ${error}`);
            return { success: false, message: "Unhandled error!", data: [error] };
        }
    };

    async fetchAnimals(role: string, farmId: string): Promise<IResponse> {
        try {
            if (role === RoleLevels.ADMIN) {
                const animal = await Animal.find();

                return { success: true, message: "Ok!", data: animal };
            } else if (role === RoleLevels.FARMMANAGER) {
                const farm = await Farms.findOneBy({ id: farmId });

                if (!farm) return { success: false, message: "Invalid farm id", data: [] };

                const animals = await Animal.findBy({ farm: { id: farmId } });
                return { success: true, message: "Ok!", data: animals };
            } else {
                return { success: false, message: "Invalid role!", data: [] };

            }
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