import { adminModel } from "../Models/admin.Model";
import { IResponseAdmin, IUser } from "../Types/user.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";
import { Users } from "../entity/user.Entity";
import { Roles } from "../entity/role.Entity";
import { ObjectId } from "mongodb";

export class User {
    async createUser(user: IUser): Promise<IResponse> {
        try {
            // Validate required fields
            if (!user.email || !user.password || !user.userName) {
                return { success: false, message: "Email, password, and username are required!" };
            }

            if (!user.role) {
                return { success: false, message: "Role is required!" };
            }

            const roleId = typeof user.role === 'string'
                ? new ObjectId(user.role)
                : user.role;


            // Check if the role exists
            const roleExists = await Roles.findOneBy({ _id: roleId });
            if (!roleExists) {
                return { success: false, message: `Invalid role ID: ${user.role}` };
            }

            // Check if email already exists (recommended)
            const existingUser = await Users.findOneBy({ email: user.email });
            if (existingUser) {
                return { success: false, message: "Email already in use" };
            }

            // Create and save user
            const newUser = Users.create({
                email: user.email,
                password: user.password,
                role: roleId,
                userName: user.userName
            });

            await newUser.save();

            return { success: true, message: "User created successfully" };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: "An unknown error occurred while creating a user" };
        }
    }
    async fetchAdmins(): Promise<IResponseAdmin> {
        try {
            const users = await Users.find();
            return { success: true, message: "Users found!", data: users };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: "An unknown error occured while fetching admins!" }
        }
    }

    async fetchAdminById(id: string): Promise<IResponseAdmin> {
        try {
            // const admin = await Users.findById(id);
            //     if (!admin) {
            //         return { success: false, message: "Admins not found" }
            //     }
            return { success: true, message: "Admins found", data: [] };
        } catch (error) {
            //     const knownError = iError.GetError(error);
            //     if (knownError.success) {
            //         return { success: false, message: knownError.message };
            //     }
            return { success: false, message: "An unknown error occured while fetching admins!" }
        }
    }
}

export const userClass = new User();