import dotenv from "dotenv";
import { Admin } from "../Classes/admin.Class";
import bcrypt from "bcryptjs";
import { adminModel } from "../Models/admin.model";
import { IError } from "../Classes/error.class";
dotenv.config();

const errorHandler = new IError()

export class AuthValidator {
    ADMIN_SECRET_KEY: string;

    constructor() {
        this.ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";
    }

    async IsValidAdminPassword(password: string, id: string): Promise<boolean> {
        const adminClass = new Admin();
        const admin = await adminClass.fetchAdminById(id);

        if (!admin.admin) {
            return false
        }

        const isValidPassword = await bcrypt.compare(password, admin.admin.password);

        return isValidPassword;
    }

    async AdminExistsById(id: string): Promise<boolean> {
        try {
            const admin = await adminModel.findById(id);
            return !!admin;
        } catch (error) {
            errorHandler.GetError(error);
            return false;
        }
    }

    async AdminExistsByUsername(userName: string): Promise<{ success: boolean, id?: string }> {
        const admin = await adminModel.findOne({ userName: userName });
        if (!admin) {
            return { success: !!admin };
        }
        return { success: !!admin, id: admin._id.toString() };
    }

    async AdminExistsByEmail(email: string): Promise<{ success: boolean, id?: string }> {
        const admin = await adminModel.findOne({ email: email });
        if (!admin) {
            return { success: !!admin };
        }
        return { success: !!admin, id: admin._id.toString() };
    }

}