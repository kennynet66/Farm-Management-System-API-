import { Router } from "express";
import { AuthController } from "../Controller/auth.Controller";

class AuthRoutes {
    router: Router;
    controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.controller.loginUser);
    }
}

export const authRoutes = new AuthRoutes();