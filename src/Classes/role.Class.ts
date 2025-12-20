import { Permissions } from "../entity/permissions.Entity";
import { Roles } from "../entity/role.Entity";
import { TRole } from "../Types/auth.Types";
import { IResponse } from "../Types/global.Types";
import { In } from "typeorm";

export class RoleClass {
    async createRole(newRole: TRole): Promise<IResponse> {
        try {
            // Validate required fields
            if (!newRole || newRole.key === "" || newRole.name === "" || newRole.permissions.length <= 0) {
                return { success: false, message: "Key, name, and permissions are required", data: [] };
            }

            // Check if role with same key already exists
            const existingRole = await Roles.findOne({
                where: { key: newRole.key.toUpperCase().trim() }
            });

            if (existingRole) {
                return { success: false, message: "Role with this key already exists", data: [] };
            }

            // Fetch the actual Permissions entities
            const permissions = await Permissions.find({
                where: { id: In(newRole.permissions) }
            });

            // Validate that all permission IDs were found
            if (permissions.length !== newRole.permissions.length) {
                return {
                    success: false,
                    message: `Some permission IDs are invalid. Found ${permissions.length} of ${newRole.permissions.length}`, data: []
                };
            }

            // Create role
            const role = Roles.create({
                key: newRole.key.toUpperCase().trim(),
                name: newRole.name.trim(),
                description: newRole.description.trim(),
                isSystemDefault: newRole.isSystemDefault || false,
                permissions: permissions
            });

            await role.save();

            return {
                success: true,
                message: "Role created successfully",
                data: [role]
            };
        } catch (error) {
            throw new Error(`Failed to create role: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async updateRolePermissions(permissions: string[], roleId: string): Promise<IResponse> {
        try {
            // Remove duplicate IDs
            const uniquePermissionIds = Array.from(new Set(permissions));

            if (uniquePermissionIds.length === 0) {
                return { success: false, message: "At least one permission is required", data: [] };
            }

            // Find the role with existing permissions
            const role = await Roles.findOne({
                where: { id: roleId },
                relations: ['permissions']
            });

            if (!role) {
                return { success: false, message: "Role not found", data: [] };
            }

            // Fetch valid permission entities (not just IDs!)
            const validPermissions = await Permissions.find({
                where: { id: In(uniquePermissionIds) }
            });

            if (validPermissions.length === 0) {
                return { success: false, message: "No valid permissions found", data: [] };
            }

            // Update role permissions with entities
            role.permissions = validPermissions;
            await role.save();

            return {
                success: true,
                message: `Updated successfully. Applied ${validPermissions.length} of ${uniquePermissionIds.length} permissions`,
                data: [{
                    roleId: role.id,
                    appliedPermissions: validPermissions.length,
                    requestedPermissions: uniquePermissionIds.length
                }]
            };
        } catch (error) {
            throw new Error(`Failed to update role permissions: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async fetchRoles(): Promise<IResponse> {
        try {
            const roles = await Roles.find({
                relations: { permissions: true },
                select: {
                    permissions: { key: true, name: true, description: true }
                }
            });

            return {
                success: true,
                message: "Ok!",
                data: roles
            };
        } catch (error) {
            throw new Error(`Failed to fetch roles: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export const roleClass = new RoleClass();