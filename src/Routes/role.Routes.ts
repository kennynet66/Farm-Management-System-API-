import { Router } from "express";
import { RoleController } from "../Controller/role.Controller";
import { AuthMiddleware } from "../Middleware/auth.Middleware";

export class RoleRoutes {
    public router: Router;
    private controller: RoleController;
    middleware: AuthMiddleware;

    constructor() {
        this.controller = new RoleController();
        this.router = Router();
        this.middleware = new AuthMiddleware();
        this.initializeRoleRoutes();
    }

    initializeRoleRoutes() {
        this.router.post("/addRole", this.middleware.requireAdmin, this.controller.createRole);
        this.router.put("/update-role-permissions/:id", this.middleware.requireAdmin, this.controller.updateRolePermissions);
        this.router.get("/fetch-roles", this.middleware.requireAdmin, this.controller.fetchRoles);
    }
}

export const roleRoutes = new RoleRoutes();