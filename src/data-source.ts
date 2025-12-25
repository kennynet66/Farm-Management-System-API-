import "reflect-metadata"
import { DataSource } from "typeorm"
import { Environments } from "./Types/global.Types"
import dotenv from "dotenv";
import { Permissions } from "./entity/permissions.Entity";
import { Roles } from "./entity/role.Entity";
import { Users } from "./entity/user.Entity";
import { Farms } from "./entity/farm.Entity";
import { AnimalCategory } from "./entity/animalCategory.Entity";
import { AnimalBreed } from "./entity/animalBreed";
import { Animal } from "./entity/animal.Entity";

dotenv.config();

const environment: Environments = (process.env.Environment as Environments) || "Development";
const atlasURL: string = process.env.ATLAS_URL || "";
const localURL: string = process.env.LOCAL_URL || "";
const connectionString: string = environment === "Development" ? localURL : environment === "Production" ? atlasURL : "";

const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME;
const database = process.env.DB_DATABASE
const port = parseInt(process.env.DB_PORT || "5433");
const isProd: boolean = process.env.ENVIRONMENT === "Development" ? false : true

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: connectionString,
    synchronize: true,
    logging: true,
    entities: [],
    migrations: [],
    subscribers: [],
    migrationsRun: true
})

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: host || "localhost",
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [Permissions, Roles, Users, Farms, AnimalCategory, AnimalBreed, Animal],
    synchronize: !isProd,
    logging: !isProd,
    ssl: isProd ? {
        rejectUnauthorized: false
    } : false
})