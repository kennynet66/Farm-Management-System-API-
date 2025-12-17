import { IResponseUser, IUser } from "../Types/user.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";
import { Users } from "../entity/user.Entity";
import { Roles } from "../entity/role.Entity";

export class User {
    async createUser(userInput: IUser): Promise<IResponse> {
        try {
            if (!userInput.email || !userInput.password || !userInput.userName) {
                return { success: false, message: "Required fields missing!" };
            }

            // Check if role exists (with permissions loaded)
            const role = await Roles.findOne({
                where: { id: userInput.role },
                relations: ['permissions']
            });

            if (!role) {
                return { success: false, message: `Invalid role ID` };
            }

            // Check if email exists
            const existingUser = await Users.findOneBy({ email: userInput.email });
            if (existingUser) {
                return { success: false, message: "Email already in use" };
            }

            // Create user
            const newUser = Users.create({
                email: userInput.email,
                password: userInput.password,
                userName: userInput.userName,
                lastName: userInput.lastName,
                firstName: userInput.firstName,
                role: role
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

    async getUserWithPermissions(userId: string): Promise<IResponse> {
        try {
            const user = await Users.findOne({
                where: { id: userId },
                relations: ['role', 'role.permissions']
            });

            if (!user) {
                return { success: false, message: "User not found" };
            }

            // Access permissions through role
            const permissions = user.role.permissions;

            return {
                success: true,
                message: "Ok",
                data: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                    permissions: permissions
                }
            };
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async fetchUsers(): Promise<IResponseUser> {
        try {
            const users = await Users.find({
                select: {
                    id: true,
                    userName: true,
                    lastName: true,
                    firstName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    role: true
                }
            });
            return { success: true, message: "Users found!", data: users };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: "An unknown error occured while fetching admins!" }
        }
    }

    async fetchUserById(id: string): Promise<IResponseUser> {
        try {
            const user = await Users.find({
                where: { id: id }, select: {
                    id: true,
                    userName: true,
                    lastName: true,
                    firstName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    role: true
                }
            });

            return { success: true, message: "User found", data: user };
        } catch (error) {
            return { success: false, message: "An unknown error occured while fetching admins!" }
        }
    }
}

export const userClass = new User();