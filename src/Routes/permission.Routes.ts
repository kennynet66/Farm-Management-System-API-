import { Router } from "express";
import { PermissionController } from "../Controller/permission.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

class PermissionRoutes {
    public router: Router;
    private controller: PermissionController;
    private middleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.controller = new PermissionController();
        this.middleware = new AuthMiddleware();
        this.initializePermissionRoutes();
    }

    private initializePermissionRoutes() {
        this.router.post("/addPermission", this.middleware.requireAdmin, this.controller.createPermission);
        this.router.get("/fetchPermission", this.middleware.requireAdmin, this.controller.fetchPermissions);
    }
}

export const permissionRoutes = new PermissionRoutes();