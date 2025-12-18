import { Request, Response } from "express";
import { userClass } from "../Classes/user.Class";
import { IResponseUser, IUser } from "../Types/user.Types";
import bcrypt from "bcryptjs";

export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;

            user.password = await bcrypt.hash(user.password, 10);

            const userCreated = await userClass.createUser(user);

            return res.status(200).json({
                message: userCreated.message
            })
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while creating user"
            });
        }
    };
    async fetchUsers(req: Request, res: Response) {
        try {
            const users: IResponseUser = await userClass.fetchUsers();
            return res.json({ users: users.data }).status(200);
        } catch (error) {
            return res.json({ message: "An unknown error occurred while fetching user" }).status(500);
        }
    };
    async fetchUserById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const user: IResponseUser = await userClass.fetchUserById(id);
            return res.json({ user: user.data }).status(200);
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while fetching user by Id"
            });
        }
    };
}