import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "./Types/global.Types"
import dotenv from "dotenv";
import { Permissions } from "./entity/permissions.Entity";
import { Roles } from "./entity/role.Entity";
import { Users } from "./entity/user.Entity";

dotenv.config();

const environment: Environments = (process.env.Environment as Environments) || "Development";
const atlasURL: string = process.env.ATLAS_URL || "";
const localURL: string = process.env.LOCAL_URL || "";
const connectionString: string = environment === "Development" ? localURL : environment === "Production" ? atlasURL : "";


export const AppDataSource = new DataSource({
    type: "mongodb",
    url: connectionString,
    synchronize: true,
    logging: true,
    entities: [Permissions, Roles, Users],
    migrations: [],
    subscribers: [],
    migrationsRun: true
})