import { AnimalBreed } from "../entity/animalBreed";
import { AnimalCategory } from "../entity/animalCategory.Entity";
import { IResponse } from "../Types/global.Types";
import { TBreed } from "../Types/livestock.Types";

class Breed {
    async addBreed(breedDetails: TBreed): Promise<IResponse> {
        try {
            if (!breedDetails.animalCategory) return { success: false, message: `Animal category is empty`, data: [] };
            // check if breed exists by breed name
            const breedExists = await AnimalBreed.findOne({ where: { name: breedDetails.name.toLowerCase() } });


            // get actual animal category
            const animalCategory = await AnimalCategory.findOne({ where: { id: breedDetails.animalCategory } });

            if (!animalCategory) return { success: false, message: `Animal category, ${breedDetails.animalCategory} does not exist!`, data: [] };
            if (breedExists) return { success: false, message: "A breed with this name already exists", data: [] };
            const newBreed = AnimalBreed.create({ ...breedDetails, name: breedDetails.name.toLowerCase(), animalCategory: animalCategory });

            await newBreed.save();

            return { success: true, message: "Breed added successfully", data: [] };
        } catch (error) {
            throw Error(`An error occurred while adding a new breed ${error}`);
        }
    }

    async fetchBreeds(): Promise<IResponse> {
        try {
            const breeds = await AnimalBreed.find();

            return { success: true, message: "Ok!", data: breeds };
        } catch (error) {
            throw Error(`An error occurred while adding a new breed ${error}`);
        }
    }
}

export const breed = new Breed();