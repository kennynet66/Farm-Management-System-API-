import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid";

export class DefaultRoles1766873030735 implements MigrationInterface {

    defaultRoles = [
        {
            id: v4(),
            key: "ADMIN",
            name: "Admin",
            description: "Administrator with full system access",
        },
        {
            id: v4(),
            key: "FARMMANAGER",
            name: "Farm Manager",
            description: "Manages farm operations and livestock",
        }
    ]

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert roles
        for (const role of this.defaultRoles) {
            await queryRunner.query(`
                INSERT INTO roles (id, key, name, description, "createdAt", "updatedAt", "isSystemDefault")
                VALUES ('${role.id}', '${role.key}', '${role.name}', '${role.description}', NOW(), NOW(), true)
                ON CONFLICT (key) DO NOTHING
            `);
        }

        // Get role and permission IDs
        const adminRole = await queryRunner.query(`
            SELECT id FROM roles WHERE key = 'ADMIN' LIMIT 1
        `);
        const farmManagerRole = await queryRunner.query(`
            SELECT id FROM roles WHERE key = 'FARMMANAGER' LIMIT 1
        `);

        const canWriteFarmData = await queryRunner.query(`
            SELECT id FROM permissions WHERE key = 'CANWRITEFARMDATA' LIMIT 1
        `);
        const canReadFarmData = await queryRunner.query(`
            SELECT id FROM permissions WHERE key = 'CANREADFARMDATA' LIMIT 1
        `);
        const canReadAdminData = await queryRunner.query(`
            SELECT id FROM permissions WHERE key = 'CANREADADMINDATA' LIMIT 1
        `);
        const canWriteAdminData = await queryRunner.query(`
            SELECT id FROM permissions WHERE key = 'CANWRITEADMINDATA' LIMIT 1
        `);

        if (!adminRole.length || !farmManagerRole.length) {
            throw new Error('Roles not found');
        }

        const adminRoleId = adminRole[0].id;
        const farmManagerRoleId = farmManagerRole[0].id;

        // Assign permissions to ADMIN role (all permissions)
        if (canWriteFarmData.length) {
            await queryRunner.query(`
                INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId")
                VALUES ('${adminRoleId}', '${canWriteFarmData[0].id}')
                ON CONFLICT DO NOTHING
            `);
        }
        if (canReadFarmData.length) {
            await queryRunner.query(`
                INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId")
                VALUES ('${adminRoleId}', '${canReadFarmData[0].id}')
                ON CONFLICT DO NOTHING
            `);
        }
        if (canReadAdminData.length) {
            await queryRunner.query(`
                INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId")
                VALUES ('${adminRoleId}', '${canReadAdminData[0].id}')
                ON CONFLICT DO NOTHING
            `);
        }
        if (canWriteAdminData.length) {
            await queryRunner.query(`
                INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId")
                VALUES ('${adminRoleId}', '${canWriteAdminData[0].id}')
                ON CONFLICT DO NOTHING
            `);
        }

        // Assign permissions to FARMMANAGER role (only farm data permissions)
        if (canWriteFarmData.length) {
            await queryRunner.query(`
                INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId")
                VALUES ('${farmManagerRoleId}', '${canWriteFarmData[0].id}')
                ON CONFLICT DO NOTHING
            `);
        }
        if (canReadFarmData.length) {
            await queryRunner.query(`
                INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId")
                VALUES ('${farmManagerRoleId}', '${canReadFarmData[0].id}')
                ON CONFLICT DO NOTHING
            `);
        }

        console.log('Default roles and permissions assigned successfully');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete role-permission relationships first
        const adminRole = await queryRunner.query(`
            SELECT id FROM roles WHERE key = 'ADMIN' LIMIT 1
        `);
        const farmManagerRole = await queryRunner.query(`
            SELECT id FROM roles WHERE key = 'FARMMANAGER' LIMIT 1
        `);

        if (adminRole.length) {
            await queryRunner.query(`
                DELETE FROM roles_permissions_permissions 
                WHERE "rolesId" = '${adminRole[0].id}'
            `);
        }
        if (farmManagerRole.length) {
            await queryRunner.query(`
                DELETE FROM roles_permissions_permissions 
                WHERE "rolesId" = '${farmManagerRole[0].id}'
            `);
        }

        // Then delete the roles
        await queryRunner.query(`
            DELETE FROM roles 
            WHERE key IN ('ADMIN', 'FARMMANAGER')
        `);
    }

}