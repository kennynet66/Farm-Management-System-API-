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
}