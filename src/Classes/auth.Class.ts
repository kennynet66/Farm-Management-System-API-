import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { IResponseLogin, LoginDetails, TRole } from "../Types/auth.Types";
import { AuthValidator } from "../Validators/auth.validator";

dotenv.config();
const authValidator = new AuthValidator();


export class Auth {
    private ADMIN_SECRET_KEY: string;

    constructor() {
        this.ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";
    }
    createToken(id: string, role: TRole): string {
        const token = Jwt.sign({ id: id, role: role }, this.ADMIN_SECRET_KEY, { expiresIn: "30d" });
        return token;
    };

    async loginUser(loginDetails: LoginDetails): Promise<IResponseLogin> {
        try {
            // check if user exists
            const userExists = await authValidator.UserExistsByUsername(loginDetails.userName);
            if (!userExists.success || !userExists.id) return { success: false, message: "User does not exist", token: null, data: [] };

            // check if password is valid
            const isValidUserPassword = await authValidator.IsValidUserPassword(loginDetails.password, userExists.id);

            if (!isValidUserPassword) {
                return { success: false, message: "Incorrect password!", token: null, data: [] };
            }

            const token = this.createToken(userExists.id, userExists.role);

            return { success: true, message: "User logged in successfully!", token: token, data: [] };
        } catch (error) {
            console.log(`An error occurred while logging in the user`, error);
            return { success: false, message: "User does not exist", token: null, data: [] };
        }
    }
}