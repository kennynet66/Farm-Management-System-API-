import { livestockTypes } from "../Models/livestockType";
import { species } from "../Models/species";
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

    async createDefaultSpecies(): Promise<void> {
        try {
            const speciesModel = species;
            DefaultLivestockTypes.map((livestockType) => {
                livestockType.defaultSpecies.map(async (defaultSpecies) => {

                    const speciesExists = await speciesModel.findOne({ name: defaultSpecies.name });
                    // Ensure the species ID matches livestockType ID
                    if (livestockType.id === defaultSpecies.livestockTypeId) {
                        // Create livestock category
                        if (!speciesExists) {
                            await speciesModel.create(defaultSpecies);
                        }
                        // Update the description if changed, and livestock type exists
                        if (speciesExists && defaultSpecies.description !== speciesExists.description) {
                            console.warn(
                                `\x1b[38;5;208mWarning: Updating description for ${speciesExists.name}\x1b[0m`
                            );
                            await speciesModel.findOneAndUpdate({ name: speciesExists.name }, { description: defaultSpecies.description })
                        }
                    } else {
                        return console.warn(
                            `\x1b[38;5;208mWarning: ${defaultSpecies.name} has an invalid livestock ID and won't be created/updated \x1b[0m`
                        );
                    }

                });
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export const seedData = new SeedData();