import { Request } from "express"
import { IResponse } from "./global.Types"

export type IAdmin = {
    userName: string
    email: string
    password: string
    role: "admin"
}

export type IResponseAdmin = IResponse & {
    admins?: IAdmin[]
    admin?: IAdmin
}

export type IRequest = Request & {
    id: string
}