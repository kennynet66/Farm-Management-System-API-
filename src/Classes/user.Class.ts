import { IResponseUser, IUser } from "../Types/user.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";
import { Users } from "../entity/user.Entity";
import { Roles } from "../entity/role.Entity";

export class User {
    async createUser(userInput: IUser): Promise<IResponse> {
        try {
            if (!userInput.email || !userInput.password || !userInput.userName) {
                return { success: false, message: "Required fields missing!", data: [] };
            }

            // Check if username exists
            const userNameExists = await Users.findOneBy({ userName: userInput.userName.trim().toLowerCase() });

            if (userNameExists) {
                return { success: false, message: "Username already in use!", data: [] }
            }

            // Check if role exists (with permissions loaded)
            const role = await Roles.findOne({
                where: { key: userInput.role },
                relations: ['permissions']
            });

            if (!role) {
                return { success: false, message: `Invalid role`, data: [] };
            }

            // Check if email exists
            const existingUser = await Users.findOneBy({ email: userInput.email });
            if (existingUser) {
                return { success: false, message: "Email already in use", data: [] };
            }

            // Create user
            const newUser = Users.create({
                email: userInput.email,
                password: userInput.password,
                userName: userInput.userName.trim().toLowerCase(),
                lastName: userInput.lastName,
                firstName: userInput.firstName,
                role: role
            });

            await newUser.save();

            return { success: true, message: "User created successfully", data: [] };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message, data: [] };
            }
            return { success: false, message: "An unknown error occurred while creating a user", data: [] };
        }
    }

    async fetchUserProfile(userId: string): Promise<IResponse> {
        try {
            if (!userId) return { success: false, message: "Invalid user Id!", data: [] };

            const user = await Users.findOne({
                where: { id: userId },
                relations: ['role', 'role.permissions'],
                select: {
                    id: true,
                    userName: true,
                    lastName: true,
                    firstName: true,
                    email: true,
                    createdAt: true,
                    role: {
                        id: true,
                        key: true,
                        name: true,
                        permissions: {
                            id: true,
                            key: true,
                            name: true,
                        }
                    }
                }
            });

            if (!user) {
                return { success: false, message: "User not found", data: [] };
            }

            return {
                success: true,
                message: "Ok",
                data: [user]
            };
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async fetchUsers(): Promise<IResponseUser> {
        try {
            const users = await Users.find({
                relations: ['role', 'role.permissions'],
                select: {
                    id: true,
                    userName: true,
                    lastName: true,
                    firstName: true,
                    email: true,
                    createdAt: true,
                    role: {
                        id: true,
                        key: true,
                        name: true,
                    }
                }
            });
            return { success: true, message: "Users found!", data: users };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message, data: [] };
            }
            return { success: false, message: "An unknown error occured while fetching users!", data: [] }
        }
    }

    async fetchUserById(id: string): Promise<IResponseUser> {
        try {
            const user = await Users.find({
                where: { id: id }, relations: ['role', 'role.permissions'],
                select: {
                    id: true,
                    userName: true,
                    lastName: true,
                    firstName: true,
                    email: true,
                    createdAt: true,
                    role: {
                        id: true,
                        key: true,
                        name: true,
                        permissions: {
                            id: true,
                            key: true,
                            name: true,
                        }
                    }
                }
            });

            return { success: true, message: "User found", data: user };
        } catch (error) {
            return { success: false, message: "An unknown error occured while fetching users!", data: [] }
        }
    }
}

export const userClass = new User();