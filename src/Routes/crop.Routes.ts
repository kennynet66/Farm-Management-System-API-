import { Router } from "express";
import { cropController } from "../Controller/crop.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class CropRoutes {
    public router: Router;
    private controlller: cropController;
    private middleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.controlller = new cropController();
        this.middleware = new AuthMiddleware();
        this.initializeCropRoutes();
    }

    private initializeCropRoutes() {
        this.router.post("/createcrop", this.middleware.requireFarmManager, this.controlller.createCrop);
        this.router.get("/getcrops", this.middleware.requireFarmManager, this.controlller.getCrops);
    }
}

export const cropRoutes = new CropRoutes();