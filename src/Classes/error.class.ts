import { MongooseError } from "mongoose";
import { IResponse } from "../Types/global.Types";

export class IError {
    mongooseError = new MongooseError("")
    private HandleMongoError(error: MongooseError): IResponse {
        if (error.name === "CastError") {
            return { success: true, message: "Invalid Id" };
        }

        if (error.name === "ValidationError") {
            return { success: true, message: error.message };
        }

        if (error.name === "MongooseError") {
            return { success: true, message: error.message };
        };

        return { success: false, message: "Not a known Mongo Error" };
    };

    GetError(error: any): IResponse {
        const KnownMongoError = this.HandleMongoError(error);

        if (KnownMongoError.success) {
            return { success: true, message: KnownMongoError.message };
        };
        return { success: false, message: "An unknown error occurred" };
    };
}