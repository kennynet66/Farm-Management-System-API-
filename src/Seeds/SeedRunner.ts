import { seedData } from "../Config/seed.js";
import { PermissionSeeder } from "./permissionSeeder.js";
import { RoleSeeder } from "./RoleSeeder.js";

export class SeedRunner {
    async run() {

        console.log("🌱 Running seeders...");

        // 1. Seed permissions first
        const permissionSeeder = new PermissionSeeder();
        await permissionSeeder.run();
        const permissionIds = permissionSeeder.seededIds;

        // 2. Seed the admin role with the permission IDs
        const roleSeeder = new RoleSeeder(permissionIds);
        await roleSeeder.run();

        console.log("✅ Seeding complete.");
        seedData.createDefaultLivestockTypes();
        seedData.createDefaultSpecies();
        seedData.createDefaultBreeds();
    }
}

export const runner = new SeedRunner()