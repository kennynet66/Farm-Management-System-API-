import { Router } from "express";
import { AdminController } from "../Controller/user.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class UserRoutes {
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
        this.router.post("/create-user", this.controller.createAdmin);
        this.router.get("/fetch-users", this.controller.fetchAdmin);
        this.router.get("/fetch-user/:id", this.middleware.requireAdmin, this.controller.fetchAdminById);
    }
}

export const userRoutes = new UserRoutes();