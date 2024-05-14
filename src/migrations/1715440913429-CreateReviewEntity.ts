import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewEntity1715440913429 implements MigrationInterface {
    name = 'CreateReviewEntity1715440913429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "userName" character varying, "textReview" character varying NOT NULL, "hotelId" integer NOT NULL, "rating" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_86bed2411a875eb84306554f946" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_86bed2411a875eb84306554f946"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
