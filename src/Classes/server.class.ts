import Express from "express";
import dotenv from "dotenv";
import mongoose, { MongooseError } from "mongoose";
import { Environments } from "../Types/global.Types";
import { adminRoutes } from "../Routes/admin.Routes";
import { authRoutes } from "../Routes/auth.Routes";
import { cropRoutes } from "../Routes/crop.Routes";
import { inventoryRoutes } from "../Routes/inventory.Route";
import cors from "cors"
import { livestockRoutes } from "../Routes/livestock.Routes";
import { runner } from "../Seeds/SeedRunner";
import { AppDataSource } from "../data-source";
import { Permissions } from "../entity/permissions";

dotenv.config();

export class Server {
    private server = Express();
    environment: Environments = (process.env.Environment as Environments) || "Development";
    private port: string = process.env.PORT || "";

    constructor() {
    };

    start(): void {
        this.configureRoutes();
        this.server.listen(this.port, () => {
            console.log(`[${this.environment}]: Server is listening on port ${this.port}`);
        }).on('error', (err) => {
            console.error("Error while starting server", err.message);
        });
        this.initializeDatabase();
        runner.run().catch(console.error)
    };

    private async initializeDatabase() {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            Permissions.useDataSource(AppDataSource);
        }
    }

    private configureRoutes() {
        this.server.use(cors());
        this.server.use(Express.json());
        this.server.use("/admin", adminRoutes.router);
        this.server.use("/auth", authRoutes.router);
        this.server.use("/crops", cropRoutes.router);
        this.server.use("/inventory", inventoryRoutes.router);
        this.server.use("/livestock", livestockRoutes.router);
    };
}