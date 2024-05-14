import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeHotelEntity1715597395318 implements MigrationInterface {
    name = 'ChangeHotelEntity1715597395318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "keywords"`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "wifi_name" character varying`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "wifi_password" character varying`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "front_desk_number" character varying`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "check_in_time" character varying`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "check_out_time" character varying`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "rating" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "chatBot_key" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "chatBot_key" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "check_out_time"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "check_in_time"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "front_desk_number"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "wifi_password"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "wifi_name"`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "keywords" character varying`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "description" character varying`);
    }

}
