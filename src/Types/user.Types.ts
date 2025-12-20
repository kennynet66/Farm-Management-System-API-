import { Request } from "express"
import { IResponse } from "./global.Types"

export type IUser = {
    userName: string
    email: string
    password: string
    role?: string
    firstName: string
    lastName: string
}

export type IResponseUser = IResponse & {
    users?: IUser[]
    user?: IUser
}

export type IRequest = Request & {
    id: string
}