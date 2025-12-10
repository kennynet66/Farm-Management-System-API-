import { Roles } from "../Models/roles";
import { BaseSeeder } from "./Baseseeder";

export class RoleSeeder extends BaseSeeder {
    permissionIds: string[];
    constructor(permissionIds: string[]) {
        super();
        this.permissionIds = permissionIds;
    }

    async run() {
        const adminKey = "ADMIN";

        let role = await Roles.findOne({ key: adminKey });

        if (!role) {
            role = await Roles.create({
                key: adminKey,
                name: "Administrator",
                description: "System administrator with full access",
                permissions: this.permissionIds,
                isSystemDefault: true
            });
        } else {
            role.permissions = this.permissionIds.map(id => new (require('mongoose').Types.ObjectId)(id));
            await role.save();
        }
    }
}
