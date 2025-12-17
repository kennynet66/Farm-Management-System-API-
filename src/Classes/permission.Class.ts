import { Permissions } from "../entity/permissions.Entity";
import { TPerm } from "../Types/auth.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";

export class PermissionClass {
    async createPermission(perm: TPerm): Promise<IResponse> {
        try {
            if (!perm || perm.key === "" || perm.name === "") {
                return { success: false, message: "Invalid permission" }
            }

            const permission = new Permissions();

            permission.description = perm.description;
            permission.key = perm.key.toUpperCase().trim();
            permission.name = perm.name;
            await permission.save();

            return { success: true, message: "Permission created successfully" }
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            throw Error(`An unknown error occurred ${error}`)
        }
    }

    async fetchPermissions(): Promise<IResponse> {
        try {
            const permissions = await Permissions.find();

            return { success: true, message: "Ok!", data: permissions }
        } catch (error) {
            throw Error(`An unknown error occurred ${error}`);
        }
    }
}

export const permissionClass = new PermissionClass();