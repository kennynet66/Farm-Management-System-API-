import { MongooseError } from "mongoose";
import { IResponse } from "../Types/global.Types";

class IError {
    private HandleMongoError(error: MongooseError): IResponse {
        console.log(error)
        if (error.name === "CastError") {
            return { success: true, message: `Invalid Id!`, data: [] };
        }

        if (error.name === "ValidationError") {
            const errorMessage = this.formatMongoError(error.message);
            return { success: true, message: errorMessage, data: [] };
        }

        if (error.name === "MongooseError") {
            const errorMessage = this.formatMongoError(error.message);
            return { success: true, message: errorMessage, data: [] };
        };

        return { success: false, message: "Not a known Mongo Error", data: [] };
    };

    private formatMongoError(message: string): string {
        const parts = message.split(":");
        return parts[parts.length - 1].trim();
    }

    GetError(error: any): IResponse {
        const KnownMongoError = this.HandleMongoError(error);

        if (KnownMongoError.success) {
            return { success: true, message: KnownMongoError.message, data: [] };
        };
        return { success: false, message: "An unknown error occurred", data: [] };
    };
}

export const iError = new IError()