import { Request, Response } from "express";
import { Auth } from "../Classes/auth.Class";
import { LoginDetails } from "../Types/auth.Types";

const auth = new Auth();
export class AuthController {
    async loginUser(req: Request, res: Response) {
        try {
            const loginDetails: LoginDetails = req.body;
            const loginAdmin = await auth.loginAdmin(loginDetails);

            if (!loginAdmin.success) {
                return res.status(400).json({
                    message: loginAdmin.message
                });
            }

            return res.status(200).json({ message: loginAdmin.message, token: loginAdmin.token });
        } catch (error) {
            res.status(500).json({
                message: "An unknown error ocurred",
            })
        }
    };
}