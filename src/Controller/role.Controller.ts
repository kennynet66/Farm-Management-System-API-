import { Request, Response } from "express";
import { TRole } from "../Types/auth.Types";
import { roleClass } from "../Classes/role.Class";

export class RoleController {
    async createRole(req: Request, res: Response) {
        try {
            const newRole: TRole = req.body;

            const roleCreated = await roleClass.createRole(newRole);

            if (!roleCreated.success) {
                return res.status(400).json({ message: roleCreated.message });
            }
            return res.status(201).json({ message: roleCreated.message });
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async updateRolePermissions(req: Request, res: Response) {
        try {
            const roleId: string = req.params.id;
            const { permissions } = req.body;

            const roleUpdated = await roleClass.updateRolePermissions(permissions, roleId);

            if (!roleUpdated.success) {
                return res.status(400).json({ message: roleUpdated.message });
            }
            return res.status(200).json({ message: roleUpdated.message });
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }
}