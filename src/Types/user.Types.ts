import { Request } from "express"
import { IResponse } from "./global.Types"
import { ObjectId } from "typeorm"

export type IUser = {
    userName: string
    email: string
    password: string
    role: ObjectId
}

export type IResponseAdmin = IResponse & {
    admins?: IUser[]
    admin?: IUser
}

export type IRequest = Request & {
    id: string
}