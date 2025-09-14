import { Router } from "express";
import { AdminController } from "../Controller/admin.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class AdminRoutes {
    public router: Router;
    private controller: AdminController;
    private middleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.controller = new AdminController();
        this.middleware = new AuthMiddleware();
        this.initializeAdminRoutes();
    }

    private initializeAdminRoutes() {
        this.router.post("/createadmin", this.controller.createAdmin);
        this.router.get("/fetchadmin", this.controller.fetchAdmin);
        this.router.get("/fetchadmin/:id", this.middleware.requireAdmin, this.controller.fetchAdminById);
    }
}

export const adminRoutes = new AdminRoutes();