import { In } from "typeorm";
import { Farms } from "../entity/farm.Entity";
import { Users } from "../entity/user.Entity";
import { T_Farm } from "../Types/farm.Types";
import { IResponse } from "../Types/global.Types";

class FarmClass {
    async createFarm(newFarmDetails: T_Farm): Promise<IResponse> {
        try {
            if (newFarmDetails.county === "" || newFarmDetails.subCounty === "" || newFarmDetails.farmName === "" || newFarmDetails.farmSize <= 0 || newFarmDetails.manager === "") {
                return { success: false, message: "Invalid farm details" };
            }

            // Fetch actual user entities
            const manager = await Users.findOne({
                where: { id: newFarmDetails.manager }
            })

            if (!manager) {
                return { success: false, message: "Invalid manager Id!" };
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

            return { success: true, message: "Farm added successfully!" };
        } catch (error) {
            throw Error(`An unknown error occurred ${error}`);
        }
    }

    async getFarms(): Promise<IResponse> {
        try {
            const farms = await Farms.find({
                relations: ['manager', 'manager.role'],
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
                        id: true,
                        userName: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: {
                            id: true,
                            key: true,
                            name: true
                        }
                    }
                }
            });

            return { success: true, message: "success!", data: farms };
        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }

    async getFarmById(id: string): Promise<IResponse> {
        try {
            const farm = await Farms.findOne({
                where: { id: id },
                relations: ['manager', 'manager.role'],
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
                        id: true,
                        userName: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: {
                            id: true,
                            key: true,
                            name: true
                        }
                    }
                }
            });

            return { success: true, message: "success!", data: farm };
        } catch (error) {
            throw Error(`An unknown error occurred while fetching farms ${error}`);
        }
    }
}

export const farmClass = new FarmClass();