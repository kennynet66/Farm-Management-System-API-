import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

dotenv.config();

export class DefaultAdmin1766873043657 implements MigrationInterface {
    private ADMIN_FIRSTNAME;
    private ADMIN_LASTNAME;
    private ADMIN_USERNAME;
    private ADMIN_EMAIL;
    private ADMIN_PASSWORD;

    constructor() {
        this.ADMIN_FIRSTNAME = process.env.ADMIN_FIRSTNAME;
        this.ADMIN_LASTNAME = process.env.ADMIN_LASTNAME;
        this.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        this.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userId = v4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(this.ADMIN_PASSWORD!, 10);

        // Get the ADMIN role ID from the roles table
        const adminRole = await queryRunner.query(`
            SELECT id FROM roles WHERE key = 'ADMIN' AND roles."isSystemDefault" = true LIMIT 1
        `);

        if (!adminRole || adminRole.length === 0) {
            throw new Error('ADMIN role not found. Please run the DefaultRoles migration first.');
        }

        const adminRoleId = adminRole[0].id;

        // Create default admin user
        await queryRunner.query(`
            INSERT INTO users (
                "id", 
                "userName", 
                "firstName", 
                "lastName", 
                "email",
                "password", 
                "roleId", 
                "isSystemDefault",
                "createdAt", 
                "updatedAt"
            )
            SELECT
                '${userId}', 
                '${this.ADMIN_USERNAME}', 
                '${this.ADMIN_FIRSTNAME}', 
                '${this.ADMIN_LASTNAME}', 
                '${this.ADMIN_EMAIL}', 
                '${hashedPassword}', 
                '${adminRoleId}',
                true,
                NOW(), 
                NOW()
            WHERE NOT EXISTS (
                SELECT 1 FROM users 
                WHERE "email" = '${this.ADMIN_EMAIL}' 
                OR "userName" = '${this.ADMIN_USERNAME}'
            )
        `);

        console.log('Default admin user created successfully');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users 
            WHERE "isSystemDefault" = true 
            AND "email" = '${this.ADMIN_EMAIL}'
        `);
    }
}