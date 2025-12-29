import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { LoginDetails, RoleLevels, TRole } from "../Types/auth.Types";
import { AuthValidator } from "../Validators/auth.validator";
import { Roles } from "../entity/role.Entity";
import { Farms } from "../entity/farm.Entity";
import { IResponse } from "../Types/global.Types";

dotenv.config();
const authValidator = new AuthValidator();


export class Auth {
    private ADMIN_SECRET_KEY: string;
    private TEMP_SECRET_KEY: string;

    constructor() {
        this.ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";
        this.TEMP_SECRET_KEY = process.env.TEMP_SECRET_KEY || "";
    }
    createToken(id: string, role: TRole, farm?: string): string {
        const token = Jwt.sign({ id: id, role: role, farm: farm }, this.ADMIN_SECRET_KEY, { expiresIn: "30d" });
        return token;
    };

    createTempToken(userId: string) {
        const token = Jwt.sign({ userId: userId }, this.TEMP_SECRET_KEY, { expiresIn: "15m" });
        return token;
    }

    async loginUser(loginDetails: LoginDetails): Promise<IResponse> {
        try {
            // check if user exists
            const userExists = await authValidator.UserExistsByUsername(loginDetails.userName);
            console.log(userExists);
            if (!userExists.success || !userExists.id || !userExists.role) return { success: false, message: "User does not exist", data: [] };

            // check if password is valid
            const isValidUserPassword = await authValidator.IsValidUserPassword(loginDetails.password, userExists.id);

            if (!isValidUserPassword) {
                return { success: false, message: "Incorrect password!", data: [] };
            }

            const userRole = await Roles.findOne({ where: { id: userExists.role.id } });

            if (userRole?.key === RoleLevels.FARMMANAGER) {
                const usersFarms = await Farms.find({ where: { manager: { id: userExists.id } } });

                if (!usersFarms || usersFarms.length <= 0) {
                    const token = this.createTempToken(userExists.id);
                    return { success: true, message: "User logged in successfully!", data: [{ CreateFarmToken: token, token: null }] };
                }

                const token = this.createToken(userExists.id, userExists.role, usersFarms[0].id);
                return { success: true, message: "User logged in successfully!", data: [{ token: token, CreateFarmToken: null }] };
            }

            const token = this.createToken(userExists.id, userExists.role);

            return { success: true, message: "User logged in successfully!", data: [{ token: token, CreateFarmToken: null }] };
        } catch (error) {
            console.log(`An error occurred while logging in the user`, error);
            return { success: false, message: "User does not exist", data: [] };
        }
    }
}

export const auth = new Auth();