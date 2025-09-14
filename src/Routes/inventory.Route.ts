import { Router } from "express";
import { InventoryController } from "../Controller/inventory.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class InventoryRoutes {
    router: Router
    controller: InventoryController
    middleware: AuthMiddleware

    constructor() {
        this.router = Router();
        this.controller = new InventoryController();
        this.middleware = new  AuthMiddleware()
        this.initializeInventoryRoutes()
    }

    initializeInventoryRoutes() {
        this.router.post("/createinventoryitem", this.middleware.requireAdmin, this.controller.createInventoryItem);
        this.router.get("/getinventoryitems", this.controller.getInventoryItems);
        this.router.get("/getinventoryitem/:id", this.middleware.requireAdmin, this.controller.getInventoryItem);
    }
}

export const inventoryRoutes = new InventoryRoutes();