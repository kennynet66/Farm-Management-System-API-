import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { iError } from "../Classes/error.class";
import { Users } from "../entity/user.Entity";
dotenv.config();

export class AuthValidator {
    ADMIN_SECRET_KEY: string;
    TEMP_SECRET_KEY: string;


    constructor() {
        this.ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";
        this.TEMP_SECRET_KEY = process.env.TEMP_SECRET_KEY || "";
    }

    async IsValidUserPassword(password: string, id: string): Promise<boolean> {
        const user = await Users.findOne({
            where: { id: id }
        });

        if (!user) {
            return false
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        return isValidPassword;
    }

    async UserExistsById(id: string): Promise<boolean> {
        try {
            const user = await Users.findOne({ where: { id: id } });
            return !!user;
        } catch (error) {
            iError.GetError(error);
            return false;
        }
    }

    async UserExistsByUsername(userName: string) {
        const user = await Users.findOne({ where: { userName: userName.toLowerCase() } });
        if (!user) {
            return { success: !!user, role: undefined };
        }
        return { success: !!user, id: user.id, role: user.role };
    }

    async UserExistsByEmail(email: string): Promise<{ success: boolean, id?: string }> {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return { success: !!user };
        }
        return { success: !!user, id: user.id };
    }

}