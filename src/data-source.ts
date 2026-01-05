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

const useProduction = process.env.USE_PRODUCTION_DB === 'true';

const host = useProduction ? process.env.PROD_DB_HOST : process.env.DB_HOST;
const port = parseInt(useProduction ? process.env.PROD_DB_PORT! : process.env.DB_PORT!);
const username = useProduction ? process.env.PROD_DB_USERNAME : process.env.DB_USERNAME;
const password = useProduction ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD;
const database = useProduction ? process.env.PROD_DB_DATABASE : process.env.DB_DATABASE;

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: host || "localhost",
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [Permissions, Roles, Users, Farms, AnimalCategory, AnimalBreed, Animal],
    synchronize: false,
    logging: true,
    ssl: useProduction ? {
        rejectUnauthorized: false
    } : false,
    migrationsRun: true,
    migrations: [__dirname + '/migration/**/*{.js,.ts}']
});