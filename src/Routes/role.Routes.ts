import { Router } from "express";
import { RoleController } from "../Controller/role.Controller";

export class RoleRoutes {
    public router: Router;
    private controller: RoleController;

    constructor() {
        this.controller = new RoleController();
        this.router = Router();
        this.initializeRoleRoutes();
    }

    initializeRoleRoutes() {
        this.router.post("/addRole", this.controller.createRole);
        this.router.put("/update-role-permissions/:id", this.controller.updateRolePermissions);
    }
}

export const roleRoutes = new RoleRoutes();