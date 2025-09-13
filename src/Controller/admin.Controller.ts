import { Request, Response } from "express";
import { Admin } from "../Classes/admin.Class";
import { IResponseAdmin, IAdmin } from "../Types/admin.Types";
import bcrypt from "bcryptjs";

const adminClass = new Admin();

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        try {
            const admin: IAdmin = req.body;

            admin.password = await bcrypt.hash(admin.password, 12);

            const adminCreated = await adminClass.createAdmin(admin);

            return res.status(200).json({
                message: adminCreated.message
            })
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while creating admin"
            });
        }
    };
    async fetchAdmin(req: Request, res: Response) {
        try {
            const admin: IResponseAdmin = await adminClass.fetchAdmins();
            return res.json({ admins: admin.admins }).status(200);
        } catch (error) {
            return res.json({ message: "An unknown error occurred while fetching admin" }).status(500);
        }
    };
    async fetchAdminById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const admin: IResponseAdmin = await adminClass.fetchAdminById(id);
            return res.json({ admin: admin.admin }).status(200);
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while fetching admin by Id"
            });
        }
    };
}