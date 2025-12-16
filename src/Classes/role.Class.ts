import { ObjectId } from "mongodb";
import { Permissions } from "../entity/permissions.Entity";
import { Roles } from "../entity/role.Entity";
import { TPerm, TRole } from "../Types/auth.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";
import { In } from "typeorm";
import { AppDataSource } from "../data-source";

export class RoleClass {
    async createRole(newRole: TRole): Promise<IResponse> {
        try {
            // check if name, permissions and key are not empty
            if (!newRole || newRole.key === "" || newRole.name === "" || newRole.permissions.length <= 0) { }
            const role = new Roles()

            // check if role key exists
            const existing = await Roles.findOne({ where: { key: newRole.key.toUpperCase() } });

            if (existing?.key.toUpperCase() === newRole.key.toUpperCase()) {
                return { success: false, message: "Role with this key already exists" }
            }

            // check if permission Id's are valid
            for (const perm of newRole.permissions) {
                const validPerm = await Permissions.findOneBy({ _id: new ObjectId(perm) });
                if (!validPerm) {
                    return { success: false, message: `Invalid permission ID: ${perm}` }
                }
            }

            role.description = newRole.description.trim();
            role.key = newRole.key.toUpperCase().trim();
            role.name = newRole.name.trim();
            role.isSystemDefault = newRole.isSystemDefault || false;
            role.permissions = newRole.permissions;

            await role.save();
            return { success: true, message: "Role created successfully" };
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async updateRolePermissions(permissions: string[], role: string): Promise<IResponse> {
        try {
            // remove duplicate ids
            const perms = Array.from(new Set(permissions));

            // valid permissions
            let validPermissions = [];

            // Grab only the valid permissions
            for (let index = 0; index < perms.length; index++) {
                const existing = await Permissions.findOneBy({ _id: new ObjectId(perms[index]) });

                if (existing) {
                    validPermissions.push(existing._id);
                }
            }

            await Roles.update({ _id: new ObjectId(role) }, { permissions: validPermissions });

            return { success: true, message: "Updated successfully" };
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async fetchRoles(): Promise<IResponse> {
        try {
            const roles = await Roles.find();

            const permissionRepo = AppDataSource.getMongoRepository(Permissions);

            // Collect all unique permission IDs from all roles
            const allPermIds = [...new Set(
                roles.flatMap(role => role.permissions.map(id => new ObjectId(id)))
            )];

            // Fetch all permissions in a single query
            const allPermissions = await permissionRepo.find({
                where: { _id: { $in: allPermIds } }
            });

            // Create a Map for quick lookup
            const permMap = new Map(
                allPermissions.map(perm => [perm._id.toString(), perm])
            );

            // Attach full permission objects to each role
            const rolesWithPermissions = roles.map(role => ({
                ...role,
                permissions: role.permissions
                    .map(id => permMap.get(id.toString()))
                    .filter(Boolean) // Remove any null/undefined entries
            }));

            return {
                success: true,
                message: "Ok!",
                data: rolesWithPermissions
            };
        } catch (error) {
            throw new Error(`Failed to fetch roles: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export const roleClass = new RoleClass();