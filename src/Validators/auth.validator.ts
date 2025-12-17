import dotenv from "dotenv";
import { userClass } from "../Classes/user.Class";
import bcrypt from "bcryptjs";
import { iError } from "../Classes/error.class";
import { adminModel } from "../Models/admin.Model";
dotenv.config();

export class AuthValidator {
    ADMIN_SECRET_KEY: string;

    constructor() {
        this.ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";
    }

    async IsValidAdminPassword(password: string, id: string): Promise<boolean> {
        const admin = await userClass.fetchAdminById(id);

        if (!admin.admin) {
            return false
        }

        const isValidPassword = await bcrypt.compare(password, admin.admin.password);

        return isValidPassword;
    }

    async UserExistsById(id: string): Promise<boolean> {
        try {
            const admin = await adminModel.findById(id);
            return !!admin;
        } catch (error) {
            iError.GetError(error);
            return false;
        }
    }

    async UserExistsByUsername(userName: string): Promise<{ success: boolean, id?: string }> {
        const admin = await adminModel.findOne({ userName: userName });
        if (!admin) {
            return { success: !!admin };
        }
        return { success: !!admin, id: admin._id.toString() };
    }

    async UserExistsByEmail(email: string): Promise<{ success: boolean, id?: string }> {
        const admin = await adminModel.findOne({ email: email });
        if (!admin) {
            return { success: !!admin };
        }
        return { success: !!admin, id: admin._id.toString() };
    }

}