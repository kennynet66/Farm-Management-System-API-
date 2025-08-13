import dotenv from "dotenv";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthValidator } from "../Validators/auth.validator";
import { IRequest } from "../Types/admin.Types";
dotenv.config();

const authValidator = new AuthValidator();


export class AuthMiddleware {
    async requireAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];

            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401)
            };

            jwt.verify(token, authValidator.ADMIN_SECRET_KEY, async (err, decodedToken: any) => {
                if (err as JsonWebTokenError) {
                    return res.status(401).json({
                        message: err?.message
                    });
                } else {
                    const adminExists = await authValidator.AdminExistsById(decodedToken.id);
                    if (!adminExists) return res.status(401).json({ message: "Invalid token" })
                    next();
                }
            });

        } catch (error) {
            res.status(500).json({
                message: `An unknown error occurred in auth middleware: ${error}`
            })
        }

    }
}