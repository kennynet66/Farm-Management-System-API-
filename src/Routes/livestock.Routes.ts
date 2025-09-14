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
        this.router.post("/addlivestock", this.controller.addLivestock);
        this.router.get("/fetchlivestock", this.controller.fetchLivestock);
        this.router.get("/fetchlivestock/:id", this.controller.fetchLivestockById);
    }
}

export const livestockRoutes = new LivestockRoutes();