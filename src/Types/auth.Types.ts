import { IResponse } from "./global.Types"

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