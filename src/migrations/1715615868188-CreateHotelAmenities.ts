import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHotelAmenities1715615868188 implements MigrationInterface {
    name = 'CreateHotelAmenities1715615868188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hotel_amenities" ("id" SERIAL NOT NULL, "amenity_type" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, "hours" character varying NOT NULL, "hotelId" integer NOT NULL, CONSTRAINT "PK_e72818093800219d231cb7c10d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hotel_amenities" ADD CONSTRAINT "FK_0ac4ec9a177a9da0554878b3786" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel_amenities" DROP CONSTRAINT "FK_0ac4ec9a177a9da0554878b3786"`);
        await queryRunner.query(`DROP TABLE "hotel_amenities"`);
    }

}
