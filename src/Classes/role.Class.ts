import { ObjectId } from "mongodb";
import { Permissions } from "../entity/permissions.Entity";
import { Roles } from "../entity/role.Entity";
import { TRole } from "../Types/auth.Types";
import { IResponse } from "../Types/global.Types";

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
            throw Error(`An unknown error occurred: ${error}`)
        }
    }
}

export const roleClass = new RoleClass();