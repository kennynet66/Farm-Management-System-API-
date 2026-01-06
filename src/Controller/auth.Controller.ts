import { Request, Response } from "express";
import { auth } from "../Classes/auth.Class";
import { LoginDetails } from "../Types/auth.Types";
import { IUser } from "../Types/user.Types";
import bcrypt from "bcryptjs";
import { userClass } from "../Classes/user.Class";

export class AuthController {
    async loginUser(req: Request, res: Response) {
        try {
            const loginDetails: LoginDetails = req.body;
            const loginUser = await auth.loginUser(loginDetails);

            if (!loginUser.success) {
                return res.status(400).json({ ...loginUser });
            }
            return res.status(200).json({ ...loginUser });
        } catch (error) {
            res.status(500).json({
                message: "An unknown error ocurred",
            })
        }
    };

    async registerUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;

            user.password = await bcrypt.hash(user.password, 10);

            const userCreated = await userClass.createUser({ ...user, role: "FARMMANAGER" });

            return res.status(200).json({
                ...userCreated
            })
        } catch (error) {
            return res.status(500).json({
                message: "An unknown error occurred while creating user"
            });
        }
    }
}