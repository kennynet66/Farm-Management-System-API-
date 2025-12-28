import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSysDefaultColumn1766873030729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE permissions ADD COLUMN isSystemDefault boolean default false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE permissions DROP COLUMN isSystemDefault`);
    }

}
