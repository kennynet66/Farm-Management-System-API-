import { Permissions } from "../Models/permissions";
import { BaseSeeder } from "./Baseseeder";

export class PermissionSeeder extends BaseSeeder {
    seededIds: any[] = [];

    async run(): Promise<void> {
        const defaultPermissions = [
            { key: "canAddLivestock", name: "Add Livestock" },
            { key: "canFetchLivestock", name: "Fetch Livestock" }
        ];

        const permissionIds = [];

        for (const perm of defaultPermissions) {
            let record = await Permissions.findOne({ key: perm.key });

            if (!record) {
                record = await Permissions.create({
                    key: perm.key,
                    name: perm.name,
                    description: ""
                });
            }

            permissionIds.push(record._id);
        }
        this.seededIds = permissionIds;
    }
}
