import Express from "express";
import dotenv from "dotenv";
import mongoose, { MongooseError } from "mongoose";
import { Environments } from "../Types/global.Types";
import { AdminRoutes } from "../Routes/admin.Routes";
import { AuthRoutes } from "../Routes/auth.Routes";
import { CropRoutes } from "../Routes/crop.Routes";
import { inventoryRoutes } from "../Routes/inventory.Route";
import cors from "cors"

dotenv.config();

export class Server {
    private server = Express();
    environment: Environments = (process.env.Environment as Environments) || "Development";
    private atlasURL: string = process.env.ATLAS_URL || "";
    private localURL: string = process.env.LOCAL_URL || "";
    private connectionString: string;
    private port: string = process.env.PORT || "";
    private adminRoutes = new AdminRoutes();
    private authRoutes = new AuthRoutes();
    private cropRoutes = new CropRoutes();
    private inventoryRoutes = new inventoryRoutes()

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
    };

    private connectMongoDB(): void {
        mongoose.connect(this.connectionString)
            .catch((error: MongooseError) => {
                throw Error(error.message);
            });
    };

    private configureRoutes() {
        this.server.use(cors())
        this.server.use(Express.json());
        this.server.use("/admin", this.adminRoutes.router);
        this.server.use("/auth", this.authRoutes.router);
        this.server.use("/crops", this.cropRoutes.router);
        this.server.use("/inventory", this.inventoryRoutes.router)
    };
}