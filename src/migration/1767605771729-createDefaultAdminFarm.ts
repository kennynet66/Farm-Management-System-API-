import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";
import { v4 } from "uuid";

dotenv.config();

export class CreateDefaultAdminFarm1767605771729 implements MigrationInterface {

    private DefaultAdminUsername = process.env.ADMIN_USERNAME;

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get default Admin
        let adminId = await queryRunner.query(`SELECT id FROM users WHERE users."userName" = '${this.DefaultAdminUsername}';`);

        if (!adminId || adminId.length === 0) {
            throw Error('Admin not found. Please run the create default admin first');
        }

        adminId = adminId[0].id;

        // Unique farm id
        const farmId = v4();

        await queryRunner.query(`INSERT INTO farms (
                "id",
                "farmName",
                "county",
                "subCounty",
                "farmSize",
                "yearEstablished",
                "managerId",
                "createdAt",
                "updatedAt",
                "isSystemDefault"
                )
            VALUES (
                '${farmId}', 
                'Default farm', 
                'nyeri', 
                'nyeri', 
                100, 
                '01/01/2001', 
                '${adminId}', 
                NOW(), 
                NOW(),
                true
            );`
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM farms WHERE farms."farmName" = 'Default farm'`);
    }

}
