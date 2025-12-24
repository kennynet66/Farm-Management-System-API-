import { AnimalBreed } from "../entity/animalBreed";
import { IResponse } from "../Types/global.Types";
import { TBreed } from "../Types/livestock.Types";

class breed {
    async addBreed(breedDetails: TBreed): Promise<IResponse> {
        try {
            // check if breed exists by breed name
            const breedExists = await AnimalBreed.findOne({ where: { name: breedDetails.name.toLowerCase() } });

            if (breedExists) return { success: false, message: "A breed with this name already exists", data: [] };
            const newBreed = AnimalBreed.create({ ...breedDetails, name: breedDetails.name.toLowerCase() });

            await newBreed.save();

            return { success: true, message: "Breed added successfully", data: [] };
        } catch (error) {
            throw Error(`An error occurred while adding a new breed ${error}`);
        }
    }
}