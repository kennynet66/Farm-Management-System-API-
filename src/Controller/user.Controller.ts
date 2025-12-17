import { Request, Response } from "express";
import { userClass } from "../Classes/user.Class";
import { IResponseAdmin, IUser } from "../Types/user.Types";
import bcrypt from "bcryptjs";

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        try {
            const user: IUser = req.body;

            user.password = await bcrypt.hash(user.password, 10);

            const userCreated = await userClass.createUser(user);

            return res.status(200).json({
                message: userCreated.message
            })
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while creating user"
            });
        }
    };
    async fetchAdmin(req: Request, res: Response) {
        try {
            const admin: IResponseAdmin = await userClass.fetchAdmins();
            return res.json({ admins: admin.admins }).status(200);
        } catch (error) {
            return res.json({ message: "An unknown error occurred while fetching admin" }).status(500);
        }
    };
    async fetchAdminById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const admin: IResponseAdmin = await userClass.fetchAdminById(id);
            return res.json({ admin: admin.admin }).status(200);
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while fetching admin by Id"
            });
        }
    };
}