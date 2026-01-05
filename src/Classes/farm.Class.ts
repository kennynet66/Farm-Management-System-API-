import { In } from "typeorm";
import { Farms } from "../entity/farm.Entity";
import { Users } from "../entity/user.Entity";
import { T_Farm } from "../Types/farm.Types";
import { IResponse } from "../Types/global.Types";
import { RoleLevels } from "../Types/auth.Types";
import { auth, Auth } from "./auth.Class";

class FarmClass {
    async createFarm(newFarmDetails: T_Farm): Promise<IResponse> {
        try {
            if (newFarmDetails.county === "" || newFarmDetails.subCounty === "" || newFarmDetails.farmName === "" || newFarmDetails.farmSize <= 0 || newFarmDetails.manager === "") {
                return { success: false, message: "Invalid farm details", data: [] };
            }

            // Fetch actual user entities
            const manager = await Users.findOne({
                where: { id: newFarmDetails.manager }
            })

            if (!manager) {
                return { success: false, message: "Invalid manager Id!", data: [] };
            }

            const farm = Farms.create({
                farmName: newFarmDetails.farmName.trim(),
                county: newFarmDetails.county.trim(),
                subCounty: newFarmDetails.subCounty.trim(),
                farmSize: newFarmDetails.farmSize,
                yearEstablished: newFarmDetails.yearEstablished,
                manager: manager
            });

            await farm.save();

            const token = auth.createToken(manager.id, manager.role, farm.id);

            return { success: true, message: "Farm added successfully!", data: [{ token: token }] };
        } catch (error) {
            throw Error(`An unknown error occurred ${error}`);
        }
    }

    async updateFarm(farmId: string, updatedFarmDetails: Partial<T_Farm>): Promise<IResponse> {
        try {
            // Fetch the existing farm
            const farm = await Farms.findOne({
                where: { id: farmId },
                relations: ['manager']
            });

            if (!farm) {
                return { success: false, message: "Farm not found", data: [] };
            }

            // Validate only the fields that are being updated
            if (updatedFarmDetails.county !== undefined && updatedFarmDetails.county.trim() === "") {
                return { success: false, message: "County cannot be empty", data: [] };
            }

            if (updatedFarmDetails.subCounty !== undefined && updatedFarmDetails.subCounty.trim() === "") {
                return { success: false, message: "Sub-county cannot be empty", data: [] };
            }

            if (updatedFarmDetails.farmName !== undefined && updatedFarmDetails.farmName.trim() === "") {
                return { success: false, message: "Farm name cannot be empty", data: [] };
            }

            if (updatedFarmDetails.farmSize !== undefined && updatedFarmDetails.farmSize <= 0) {
                return { success: false, message: "Farm size must be greater than 0", data: [] };
            }

            // Handle manager update separately if provided
            if (updatedFarmDetails.manager !== undefined) {
                if (updatedFarmDetails.manager === "") {
                    return { success: false, message: "Manager cannot be empty", data: [] };
                }

                const newManager = await Users.findOne({
                    where: { id: updatedFarmDetails.manager }
                });

                if (!newManager) {
                    return { success: false, message: "Invalid manager Id!", data: [] };
                }

                farm.manager = newManager;
            }

            // Update only the provided fields
            if (updatedFarmDetails.farmName !== undefined) {
                farm.farmName = updatedFarmDetails.farmName.trim();
            }

            if (updatedFarmDetails.county !== undefined) {
                farm.county = updatedFarmDetails.county.trim();
            }

            if (updatedFarmDetails.subCounty !== undefined) {
                farm.subCounty = updatedFarmDetails.subCounty.trim();
            }

            if (updatedFarmDetails.farmSize !== undefined) {
                farm.farmSize = updatedFarmDetails.farmSize;
            }

            if (updatedFarmDetails.yearEstablished !== undefined) {
                farm.yearEstablished = updatedFarmDetails.yearEstablished;
            }

            await farm.save();

            return { success: true, message: "Farm updated successfully!", data: [farm] };
        } catch (error) {
            throw Error(`An unknown error occurred ${error}`);
        }
    }

    async getFarms(role: string, id: string): Promise<IResponse> {
        try {
            if (role === RoleLevels.ADMIN) {
                const farms = await Farms.find({
                    relations: ['manager'],
                    select: {
                        id: true,
                        farmName: true,
                        county: true,
                        subCounty: true,
                        farmSize: true,
                        yearEstablished: true,
                        createdAt: true,
                        updatedAt: true,
                        manager: {
                            userName: true
                        }
                    }
                });
                return { success: true, message: "success!", data: farms };
            } else if (role === RoleLevels.FARMMANAGER) {
                const farmManager = await Users.findOne({ where: { id: id } })

                if (!farmManager) return { success: false, message: "Manager not found", data: [] };

                const farms = await Farms.find({ where: { manager: { id: id } } });
                return { success: true, message: "success!", data: farms };
            } else {
                return { success: false, message: "Invalid role!", data: [] };

            }

        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }

    async getFarmById(role: string, farmId: string, managerId: string): Promise<IResponse> {
        try {
            if (role === RoleLevels.ADMIN) {

                const farm = await Farms.findOne({
                    where: { id: farmId },
                    relations: ['manager'],
                    select: {
                        id: true,
                        farmName: true,
                        county: true,
                        subCounty: true,
                        farmSize: true,
                        yearEstablished: true,
                        createdAt: true,
                        updatedAt: true,
                        manager: {
                            userName: true
                        }
                    }
                });
                return { success: true, message: "success!", data: [farm] };
            } else {
                const farm = await Farms.findOne({ where: { id: farmId, manager: { id: managerId } } });

                if (!farm) {
                    return {
                        success: false,
                        message: "Farm not found or you don't have permission to view it",
                        data: []
                    };
                }

                return { success: true, message: "success!", data: [farm] };
            }

        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }

    async getFarmProfile(role: string, farmId: string, managerId: string): Promise<IResponse> {
        try {
            if (role === RoleLevels.ADMIN) {

                const farm = await Farms.findOne({
                    where: { id: farmId },
                    select: {
                        id: true,
                        farmName: true,
                        county: true,
                        subCounty: true,
                        farmSize: true,
                        yearEstablished: true,
                        createdAt: true,
                        updatedAt: true,
                        isSystemDefault: true
                    }
                });
                return { success: true, message: "success!", data: [farm] };
            } else {
                const farm = await Farms.findOne({ where: { id: farmId, manager: { id: managerId } } });

                if (!farm) {
                    return {
                        success: false,
                        message: "Farm not found or you don't have permission to view it",
                        data: []
                    };
                }

                return { success: true, message: "success!", data: [farm] };
            }

        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }
}

export const farmClass = new FarmClass();