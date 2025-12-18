import { Router } from "express";
import { UserController } from "../Controller/user.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class UserRoutes {
    public router: Router;
    private controller: UserController;
    private middleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.middleware = new AuthMiddleware();
        this.initializeUserRoutes();
    }

    private initializeUserRoutes() {
        this.router.post("/create-user", this.middleware.requireAdmin, this.controller.createUser);
        this.router.get("/fetch-users", this.middleware.requireAdmin, this.controller.fetchUsers);
        this.router.get("/fetch-user/:id", this.middleware.requireAdmin, this.controller.fetchUserById);
    }
}

export const userRoutes = new UserRoutes();