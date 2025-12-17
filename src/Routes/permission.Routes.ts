import { Router } from "express";
import { PermissionController } from "../Controller/permission.Controller";

class PermissionRoutes {
    public router: Router;
    private controller: PermissionController

    constructor() {
        this.router = Router();
        this.controller = new PermissionController();
        this.initializePermissionRoutes();
    }

    private initializePermissionRoutes() {
        this.router.post("/addPermission", this.controller.createPermission);
        this.router.get("/fetchPermission", this.controller.fetchPermissions);
    }
}

export const permissionRoutes = new PermissionRoutes();