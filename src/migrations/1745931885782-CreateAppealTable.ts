import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppealTable1745931885782 implements MigrationInterface {
    name = 'CreateAppealTable1745931885782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appeal_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "appeal" ("id" character varying NOT NULL, "text" character varying NOT NULL, "status" "public"."appeal_status_enum" NOT NULL DEFAULT '0', "result" character varying(1000), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appeal"`);
        await queryRunner.query(`DROP TYPE "public"."appeal_status_enum"`);
    }

}
