import { Request, Response } from "express";
import { TPerm } from "../Types/auth.Types";
import { permissionClass } from "../Classes/permission.Class";

export class PermissionController {
    async createPermission(req: Request, res: Response) {
        try {
            const perm: TPerm = req.body;

            const permCreated = await permissionClass.createPermission(perm);

            if (!permCreated.success) {
                return res.status(400).json({ message: permCreated.message });
            }

            return res.status(201).json({ message: permCreated.message });
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async fetchPermissions(req: Request, res: Response) {
        try {
            const permissions = await permissionClass.fetchPermissions();

            if (!permissions.success) {
                return res.status(400).json({ message: permissions.message })
            }
            return res.status(200).json({ message: permissions.message, data: permissions.data })
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }
}