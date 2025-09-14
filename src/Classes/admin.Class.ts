import { adminModel } from "../Models/admin.Model";
import { IResponseAdmin, IAdmin } from "../Types/admin.Types";
import { IResponse } from "../Types/global.Types";
import { iError } from "./error.class";

export class Admin {
    async createAdmin(admin: IAdmin): Promise<IResponse> {
        try {
            await adminModel.create(admin);
            return { success: true, message: "Admin created successfully" };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: "an unknown error occured while creating an admin" };
        }
    };

    async fetchAdmins(): Promise<IResponseAdmin> {
        try {
            const admins = await adminModel.find();
            return { success: true, message: "Admins found!", admins: admins };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: "An unknown error occured while fetching admins!" }
        }
    }

    async fetchAdminById(id: string): Promise<IResponseAdmin> {
        try {
            const admin = await adminModel.findById(id);
            if (!admin) {
                return { success: false, message: "Admins not found" }
            }
            return { success: true, message: "Admins found", admin };
        } catch (error) {
            const knownError = iError.GetError(error);
            if (knownError.success) {
                return { success: false, message: knownError.message };
            }
            return { success: false, message: "An unknown error occured while fetching admins!" }
        }
    }
}