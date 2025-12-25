import { Router } from "express";
import { AnimalController } from "../Controller/animal.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class AnimalRoutes {
    private controller: AnimalController;
    private middleware: AuthMiddleware;
    router: Router;

    constructor() {
        this.controller = new AnimalController();
        this.middleware = new AuthMiddleware();
        this.router = Router();
        this.initializeAnimalRoutes();
    }

    initializeAnimalRoutes() {
        this.router.post("/add-animal", this.middleware.requireFarmManager, this.controller.addAnimal);
        this.router.get("/fetch-animal", this.middleware.requireFarmManager, this.controller.fetchAnimal);
    }
}

export const animalRoutes = new AnimalRoutes();