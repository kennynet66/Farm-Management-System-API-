import { Router } from "express";
import { cropController } from "../Controller/crop.Controller";

export class CropRoutes {
    public router: Router;
    private controlller: cropController;

    constructor() {
        this.router = Router();
        this.controlller = new cropController();
        this.initializeCropRoutes();
    }

    private initializeCropRoutes() {
        this.router.post("/createcrop", this.controlller.createCrop);
        this.router.get("/getcrops", this.controlller.getCrops);
    }
}