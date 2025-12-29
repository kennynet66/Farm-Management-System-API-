import { Request, Response } from "express";
import { T_Animal } from "../Types/livestock.Types";
import { animalClass } from "../Classes/animal.Class";
import { ExtendedUserRequest } from "../Types/auth.Types";
export class AnimalController {
    async addAnimal(req: ExtendedUserRequest, res: Response) {
        try {
            const newAnimal: T_Animal = req.body;
            const farm = req.farmId
            const AnimalCreated = await animalClass.addAnimal({ ...newAnimal, farm: farm as string });

            if (!AnimalCreated.success) return res.status(400).json({ ...AnimalCreated });
            return res.status(200).json({ ...AnimalCreated });
        } catch (error) {
            console.error(`[Controller]: ${error}`);
            return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
        }
    };

    async fetchAnimal(req: ExtendedUserRequest, res: Response) {
        try {
            const animals = await animalClass.fetchAnimals(req.role as string, req.farmId || "");

            if (!animals.success) return res.status(400).json({ ...animals });
            return res.status(200).json({ ...animals });
        } catch (error) {
            console.error(`[Controller]: ${error}`);
            return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
        }
    };

    async deleteAnimals(req: Request, res: Response) {
        try {
            const { animals } = req.body;
            const animalsDeleted = await animalClass.deleteAnimals(animals);

            if (!animalsDeleted.success) return res.status(400).json({ ...animalsDeleted });
            return res.status(200).json({ ...animalsDeleted });
        } catch (error) {
            console.error(`[Controller]: ${error}`);
            return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
        }
    };
}