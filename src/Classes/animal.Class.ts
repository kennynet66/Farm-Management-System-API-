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

    async updateAnimal(animalId: string, updatedAnimalDetails: Partial<Omit<T_Animal, 'farm'>>): Promise<IResponse> {
        try {
            // Fetch the existing animal
            const animal = await Animal.findOne({
                where: { id: animalId },
                relations: ['breed', 'farm']
            });

            if (!animal) {
                return { success: false, message: "Animal not found", data: [] };
            }

            // Validate only the fields that are being updated
            if (updatedAnimalDetails.tagNumber !== undefined && updatedAnimalDetails.tagNumber.trim() === "") {
                return { success: false, message: "Tag number cannot be empty", data: [] };
            }

            if (updatedAnimalDetails.sex !== undefined && !["male", "female"].includes(updatedAnimalDetails.sex)) {
                return { success: false, message: "Sex must be either 'male' or 'female'", data: [] };
            }

            if (updatedAnimalDetails.weight !== undefined && updatedAnimalDetails.weight <= 0) {
                return { success: false, message: "Weight must be greater than 0", data: [] };
            }

            if (updatedAnimalDetails.productionType !== undefined && updatedAnimalDetails.productionType.trim() === "") {
                return { success: false, message: "Production type cannot be empty", data: [] };
            }

            // Handle breed update separately if provided
            if (updatedAnimalDetails.breedId !== undefined) {
                if (updatedAnimalDetails.breedId === "") {
                    return { success: false, message: "Breed ID cannot be empty", data: [] };
                }

                const getAnimalBreed = await AnimalBreed.findOneBy({ id: updatedAnimalDetails.breedId });
                if (!getAnimalBreed) {
                    return { success: false, message: "Invalid breed id", data: [] };
                }

                animal.breed = getAnimalBreed;
            }

            // Update only the provided fields
            if (updatedAnimalDetails.tagNumber !== undefined) {
                animal.tagNumber = updatedAnimalDetails.tagNumber.trim();
            }

            if (updatedAnimalDetails.sex !== undefined) {
                animal.sex = updatedAnimalDetails.sex;
            }

            if (updatedAnimalDetails.birthDate !== undefined) {
                animal.birthDate = updatedAnimalDetails.birthDate;
            }

            if (updatedAnimalDetails.weight !== undefined) {
                animal.weight = updatedAnimalDetails.weight;
            }

            if (updatedAnimalDetails.status !== undefined) {
                animal.status = updatedAnimalDetails.status;
            }

            if (updatedAnimalDetails.notes !== undefined) {
                animal.notes = updatedAnimalDetails.notes;
            }

            if (updatedAnimalDetails.productionType !== undefined) {
                animal.productionType = updatedAnimalDetails.productionType.trim();
            }

            const updatedAnimal = await animal.save();

            if (!updatedAnimal) {
                return { success: false, message: "Failed to update animal", data: [] };
            }

            return { success: true, message: "Animal updated successfully", data: [updatedAnimal] };
        } catch (error) {
            console.error(`[Class]: ${error}`);
            return { success: false, message: "Unhandled error!", data: [error] };
        }
    }

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