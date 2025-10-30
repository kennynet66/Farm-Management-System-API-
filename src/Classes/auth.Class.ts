import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { IResponseLogin, LoginDetails } from "../Types/auth.Types";
import { AuthValidator } from "../Validators/auth.validator";

dotenv.config();
const authValidator = new AuthValidator();


export class Auth {
    private ADMIN_SECRET_KEY: string;

    constructor() {
        this.ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";
    }
    createToken(id: string): string {
        const token = Jwt.sign({ id: id }, this.ADMIN_SECRET_KEY, { expiresIn: "30d" });
        return token;
    };

    async loginAdmin(loginDetails: LoginDetails): Promise<IResponseLogin> {
        try {
            const adminExists = await authValidator.AdminExistsByUsername(loginDetails.userName);
            if (!adminExists.success || !adminExists.id) return { success: false, message: "Admin does not exist", token: null };

            const isValidAdminPassword = await authValidator.IsValidAdminPassword(loginDetails.password, adminExists.id);

            if (!isValidAdminPassword) {
                return { success: false, message: "Incorrect password!", token: null };
            }

            const token = this.createToken(adminExists.id);

            return { success: true, message: "Admin logged in successfully!", token: token };
        } catch (error) {
            console.log(`An error occurred while logging in the user of ID: ${error}`);
            return { success: false, message: "Admin does not exist", token: null };
        }
    }
}