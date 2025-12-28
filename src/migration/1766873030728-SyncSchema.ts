import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncSchema1766873030728 implements MigrationInterface {
    name = 'SyncSchema1766873030728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "issystemdefault" TO "isSystemDefault"`);
        await queryRunner.query(`CREATE TABLE "animal_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "isSystemDefault" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_217166f9e4906bc5cd783df6336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal_breed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "isSystemDefault" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "animalCategoryId" uuid, CONSTRAINT "PK_3edfe95e88e6d20c00de01a1d31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tagNumber" character varying NOT NULL, "sex" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "weight" integer NOT NULL, "status" character varying NOT NULL, "notes" character varying NOT NULL, "productionType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "breedId" uuid NOT NULL, "farmId" uuid NOT NULL, CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmName" character varying NOT NULL, "county" character varying NOT NULL, "subCounty" character varying NOT NULL, "farmSize" integer NOT NULL, "yearEstablished" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" uuid, CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isSystemDefault" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "key" SET DEFAULT 'FARMMANAGER'`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "isSystemDefault" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal_breed" ADD CONSTRAINT "FK_bba95f6461aa4abf7ac69617111" FOREIGN KEY ("animalCategoryId") REFERENCES "animal_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_5aee64ead1f7612fb352444c9f6" FOREIGN KEY ("breedId") REFERENCES "animal_breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_f156e37d9441bb5f1d23d9d95bd" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_7ac29de3dc6a92ac8f536030480" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_7ac29de3dc6a92ac8f536030480"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_f156e37d9441bb5f1d23d9d95bd"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_5aee64ead1f7612fb352444c9f6"`);
        await queryRunner.query(`ALTER TABLE "animal_breed" DROP CONSTRAINT "FK_bba95f6461aa4abf7ac69617111"`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "isSystemDefault" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "key" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isSystemDefault"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "animal_breed"`);
        await queryRunner.query(`DROP TABLE "animal_category"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "isSystemDefault" TO "issystemdefault"`);
    }

}
