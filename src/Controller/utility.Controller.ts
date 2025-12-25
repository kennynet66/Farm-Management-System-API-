import { Request, Response } from "express";
import { animalCategoryClass } from "../Classes/animalCategory.Class";
import { TAnimalCategory, TBreed } from "../Types/livestock.Types";
import { breed } from "../Classes/breed.class";

export class UtilityController {
    async addAnimalCategory(req: Request, res: Response) {
        try {
            const animalCategory: TAnimalCategory = req.body;

            const animalCategoryCreated = await animalCategoryClass.addAnimalCategory(animalCategory);

            if (!animalCategoryCreated.success) return res.status(400).json({ ...animalCategoryCreated });

            return res.status(200).json({ ...animalCategoryCreated });

        } catch (error) {
            throw Error(`[Controller]: An error occured while adding animal category`);
        }
    }

    async addAnimalBreed(req: Request, res: Response) {
        try {
            const AnimalBreed: TBreed = req.body;

            const breedCreated = await breed.addBreed(AnimalBreed);

            if (!breedCreated.success) return res.status(400).json({ ...breedCreated });

            return res.status(200).json({ ...breedCreated });
        } catch (error) {
            throw Error(`[Controller]: An error occured while adding animal breed`);
        }
    }

    async fetchAnimalBreed(req: Request, res: Response) {
        try {
            const breeds = await breed.fetchBreeds();

            if (!breeds.success) return res.status(400).json({ ...breeds });

            return res.status(200).json({ ...breeds });
        } catch (error) {
            throw Error(`[Controller]: An error occured while adding animal breed`);
        }
    }

    async fetchAnimalCategory(req: Request, res: Response) {
        try {
            const animalCategories = await animalCategoryClass.fetchAnimalCategory();

            if (!animalCategories.success) return res.status(400).json({ ...animalCategories });

            return res.status(200).json({ ...animalCategories });

        } catch (error) {
            throw Error(`[Controller]: An error occured while adding animal category`);
        }
    }
}