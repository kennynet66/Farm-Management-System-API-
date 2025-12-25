import { Router } from "express";
import { UtilityController } from "../Controller/utility.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class UtilityRoutes {
    router: Router;
    private controller: UtilityController;
    private middleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.controller = new UtilityController();
        this.middleware = new AuthMiddleware();
        this.initializeUtilityRoutes();
    }

    initializeUtilityRoutes() {
        this.router.post("/add-animal-category", this.middleware.requireAdmin, this.controller.addAnimalCategory);
        this.router.post("/add-animal-breed", this.middleware.requireAdmin, this.controller.addAnimalBreed);
        this.router.get("/fetch-animal-category", this.middleware.requireAdmin, this.controller.fetchAnimalCategory);
        this.router.get("/fetch-animal-breed", this.middleware.requireAdmin, this.controller.fetchAnimalBreed);
    }
}

export const utilityRoutes = new UtilityRoutes();