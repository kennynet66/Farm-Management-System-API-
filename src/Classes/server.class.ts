import Express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { Environments } from "../Types/global.Types";
import { userRoutes } from "../Routes/user.Routes";
import { authRoutes } from "../Routes/auth.Routes";
import { cropRoutes } from "../Routes/crop.Routes";
import { inventoryRoutes } from "../Routes/inventory.Route";
import cors from "cors"
import { PostgresDataSource } from "../data-source";
import { permissionRoutes } from "../Routes/permission.Routes";
import mongoose, { MongooseError } from "mongoose";
import { roleRoutes } from "../Routes/role.Routes";
import { farmRoutes } from "../Routes/farm.Routes";
import { utilityRoutes } from "../Routes/utility.Routes";
import { animalRoutes } from "../Routes/animal.Routes";

dotenv.config();

export class Server {
    private server = Express();
    environment: Environments = (process.env.Environment as Environments) || "Development";
    private atlasURL: string = process.env.ATLAS_URL || "";
    private localURL: string = process.env.LOCAL_URL || "";
    private connectionString: string;
    private port: string = process.env.PORT || "";

    constructor() {
        this.connectionString = this.environment === "Development" ? this.localURL : this.environment === "Production" ? this.atlasURL : "";
    };

    start(): void {
        this.configureRoutes();
        this.server.listen(this.port, () => {
            console.log(`[${this.environment}]: Server is listening on port ${this.port}`);
        }).on('error', (err) => {
            console.error("Error while starting server", err.message);
        });
        this.connectMongoDB();
        this.initializeDatabase();
    };

    private connectMongoDB(): void {
        mongoose.connect(this.connectionString)
            .catch((error: MongooseError) => {
                throw Error(error.message);
            });
    };

    private async initializeDatabase() {
        if (!PostgresDataSource.isInitialized) {
            await PostgresDataSource.initialize();
        }
    }

    private configureRoutes() {
        this.server.use(cors());
        this.server.use(Express.json());
        this.server.use("/users", userRoutes.router);
        this.server.use("/auth", authRoutes.router);
        this.server.use("/crops", cropRoutes.router);
        this.server.use("/inventory", inventoryRoutes.router);
        this.server.use("/permissions", permissionRoutes.router);
        this.server.use("/roles", roleRoutes.router);
        this.server.use("/farms", farmRoutes.router);
        this.server.use("/utility", utilityRoutes.router);
        this.server.use("/animal", animalRoutes.router)
    };
}