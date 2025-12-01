import { livestockTypes } from "../Models/livestockType";
import { DefaultLivestockTypes } from "./defaultData";

class SeedData {
    async createDefaultLivestockTypes(): Promise<void> {
        try {
            const liveStockTypesModel = livestockTypes;


            DefaultLivestockTypes.map(async (livestocktype) => {
                const livestockTypeExists = await liveStockTypesModel.findOne({ name: livestocktype.name });

                // create livestock type if it does not exist
                if (!livestockTypeExists) {
                    liveStockTypesModel.create(livestocktype);
                }

                // Update the description if changed, and livestock type exists
                if (livestockTypeExists && livestockTypeExists?.description !== livestocktype.description) {
                    console.warn(
                        `\x1b[38;5;208mWarning: Updating description for ${livestockTypeExists.name}\x1b[0m`
                    );
                    await liveStockTypesModel.findOneAndUpdate({ name: livestocktype.name }, { description: livestocktype.description })
                }

            });

        } catch (error) {
            console.log(error)
        }
    }
}

export const seedData = new SeedData();