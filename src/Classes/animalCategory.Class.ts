import { AnimalCategory } from "../entity/animalCategory.Entity";
import { IResponse } from "../Types/global.Types";
import { TAnimalCategory } from "../Types/livestock.Types";

class AnimalCategoryClass {
    async addAnimalCategory(animalCategory: TAnimalCategory): Promise<IResponse> {
        try {
            const newAnimalCategory = AnimalCategory.create({ ...animalCategory });

            await newAnimalCategory.save();

            return { success: true, message: "Animal Category created successfully", data: [] }
        } catch (error) {
            throw Error(`An unexpected error occurred while adding animal category ${error}`)
        }
    }

    async fetchAnimalCategory(): Promise<IResponse> {
        try {
            const animalCategory = await AnimalCategory.find();

            return { success: true, message: "Ok!", data: animalCategory }
        } catch (error) {
            console.error({ unhandledError: error });
            return { success: false, message: "Unhandled error!", data: ['Unhandled error!'] };
        }
    }
}

export const animalCategoryClass = new AnimalCategoryClass();