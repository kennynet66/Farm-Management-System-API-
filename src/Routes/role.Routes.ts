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
    }
}

export const roleRoutes = new RoleRoutes();