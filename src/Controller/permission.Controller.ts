import { Request, Response } from "express";
import { TPerm } from "../Types/auth.Types";
import { permissionClass } from "../Classes/permission.Class";

export class PermissionController {
    async createPermission(req: Request, res: Response) {
        try {
            const perm: TPerm = req.body;

            const permCreated = await permissionClass.createPermission(perm);

            if (!permCreated.success) {
                return res.status(400).json({ ...permCreated });
            }

            return res.status(201).json({ ...permCreated });
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }

    async fetchPermissions(req: Request, res: Response) {
        try {
            const permissions = await permissionClass.fetchPermissions();

            if (!permissions.success) {
                return res.status(400).json({ ...permissions })
            }
            return res.status(200).json({ ...permissions })
        } catch (error) {
            throw Error(`An unknown error occurred: ${error}`);
        }
    }
}