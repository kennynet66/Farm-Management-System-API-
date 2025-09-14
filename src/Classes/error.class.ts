import { MongooseError } from "mongoose";
import { IResponse } from "../Types/global.Types";

class IError {
    private HandleMongoError(error: MongooseError): IResponse {
        console.log(error)
        if (error.name === "CastError") {
            return { success: true, message: `Invalid Id!` };
        }

        if (error.name === "ValidationError") {
            const errorMessage = this.formatMongoError(error.message);
            return { success: true, message: errorMessage };
        }

        if (error.name === "MongooseError") {
            const errorMessage = this.formatMongoError(error.message);
            return { success: true, message: errorMessage };
        };

        return { success: false, message: "Not a known Mongo Error" };
    };

    private formatMongoError(message: string): string {
        const parts = message.split(":");
        return parts[parts.length - 1].trim();
    }

    GetError(error: any): IResponse {
        const KnownMongoError = this.HandleMongoError(error);

        if (KnownMongoError.success) {
            return { success: true, message: KnownMongoError.message };
        };
        return { success: false, message: "An unknown error occurred" };
    };
}

export const iError = new IError()