import { IResponse } from "./global.Types"
import { Request } from "express"

export type LoginDetails = {
    userName: string,
    password: string,
}

export type IResponseLogin = IResponse & {
    token: string | null,
}

export type TPerm = {
    key: string;
    name: string;
    description: string;
}

export type TRole = {
    key: string;
    name: string;
    description: string;
    permissions: TPerm[];
    isSystemDefault?: boolean;
}

export enum RoleLevels {
    ADMIN = "ADMIN",
    FARMMANAGER = "FARMMANAGER"
}

export interface ExtendedUserRequest extends Request {
    userId?: string,
    role?: RoleLevels
    farmId?: string
}