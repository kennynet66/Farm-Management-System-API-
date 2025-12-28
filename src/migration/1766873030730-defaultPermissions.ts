import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid";

export class DefaultPermissions1766873030730 implements MigrationInterface {
    private defaultPermissions = [
        {
            id: v4(),
            key: "CANWRITEFARMDATA",
            name: "Can read & write farm data",
            description: "",
        },
        {
            id: v4(),
            key: "CANREADFARMDATA",
            name: "Can only read farm data",
            description: "",
        },
        {
            id: v4(),
            key: "CANREADADMINDATA",
            name: "Can only read admin data",
            description: "",
        },
        {
            id: v4(),
            key: "CANWRITEADMINDATA",
            name: "Can read & write admin data",
            description: "",
        }
    ]

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const permission of this.defaultPermissions) {
            await queryRunner.query(`
                INSERT INTO permissions (id, key, name, description, "createdAt", "updatedAt", "isSystemDefault")
                VALUES ('${permission.id}', '${permission.key}', '${permission.name}', '${permission.description}', NOW(), NOW(), true)
                ON CONFLICT (key) DO NOTHING
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permissions 
            WHERE key IN ('CANWRITEFARMDATA', 'CANREADFARMDATA', 'CANREADADMINDATA', 'CANWRITEADMINDATA')
        `);
    }

}
