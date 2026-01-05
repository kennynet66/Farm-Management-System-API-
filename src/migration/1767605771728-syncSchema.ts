import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncSchema1767605771728 implements MigrationInterface {
    name = 'SyncSchema1767605771728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" ADD "isSystemDefault" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "iSSystemDefault"`);
    }

}
