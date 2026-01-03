import { Router } from "express";
import { FarmController } from "../Controller/farm.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class FarmRoutes {
    router: Router;
    private controller: FarmController
    private middleware: AuthMiddleware

    constructor() {
        this.router = Router();
        this.controller = new FarmController();
        this.middleware = new AuthMiddleware();
        this.initializeFarmRoutes()
    }

    initializeFarmRoutes() {
        this.router.post("/add-farm", this.middleware.requireCreateFarmToken, this.controller.createFarm);
        this.router.get("/get-farms", this.middleware.requireFarmManager, this.controller.getFarms);
        this.router.get("/get-farm/:id", this.middleware.requireFarmManager, this.controller.getFarmById);
        this.router.put("/update-farm/:id", this.middleware.requireFarmManager, this.controller.updateFarm);
        this.router.get("/get-farm-profile", this.middleware.requireFarmManager, this.controller.getFarmProfile);
    }
}

export const farmRoutes = new FarmRoutes();