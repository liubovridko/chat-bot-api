"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelAmenities1715615868188 = void 0;
class CreateHotelAmenities1715615868188 {
    constructor() {
        this.name = 'CreateHotelAmenities1715615868188';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "hotel_amenities" ("id" SERIAL NOT NULL, "amenity_type" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, "hours" character varying NOT NULL, "hotelId" integer NOT NULL, CONSTRAINT "PK_e72818093800219d231cb7c10d5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "hotel_amenities" ADD CONSTRAINT "FK_0ac4ec9a177a9da0554878b3786" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hotel_amenities" DROP CONSTRAINT "FK_0ac4ec9a177a9da0554878b3786"`);
            yield queryRunner.query(`DROP TABLE "hotel_amenities"`);
        });
    }
}
exports.CreateHotelAmenities1715615868188 = CreateHotelAmenities1715615868188;
//# sourceMappingURL=1715615868188-CreateHotelAmenities.js.map