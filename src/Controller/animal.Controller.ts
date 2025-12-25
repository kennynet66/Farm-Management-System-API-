import { Request, Response } from "express";
import { T_Animal } from "../Types/livestock.Types";
import { animalClass } from "../Classes/animal.Class";
export class AnimalController {
    async addAnimal(req: Request, res: Response) {
        try {
            const newAnimal: T_Animal = req.body;
            const AnimalCreated = await animalClass.addAnimal(newAnimal);

            if (!AnimalCreated.success) return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
            return res.status(500).json({ success: true, message: AnimalCreated.message, data: AnimalCreated.data });
        } catch (error) {
            console.error(`[Controller]: ${error}`);
            return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
        }
    };

    async fetchAnimal(req: Request, res: Response) {
        try {
            const newAnimal: T_Animal = req.body;
            const animals = await animalClass.fetchAnimals();

            if (!animals.success) return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
            return res.status(500).json({ success: true, message: animals.message, data: animals.data });
        } catch (error) {
            console.error(`[Controller]: ${error}`);
            return res.status(500).json({ success: false, message: "Unhandled error!", data: [] });
        }
    };
}