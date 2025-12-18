import { Router } from "express";
import { LivestockController } from "../Controller/livestock.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class LivestockRoutes {
    public router: Router;
    private controller: LivestockController;
    private middleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.controller = new LivestockController();
        this.middleware = new AuthMiddleware();
        this.initializeLivestockRoutes();
    }

    private initializeLivestockRoutes() {
        this.router.post("/addlivestock", this.middleware.requireFarmManager, this.controller.addLivestock);
        this.router.get("/fetchlivestock", this.middleware.requireFarmManager, this.controller.fetchLivestock);
        this.router.get("/fetchlivestock/:id", this.middleware.requireFarmManager, this.controller.fetchLivestockById);
    }
}

export const livestockRoutes = new LivestockRoutes();