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
exports.ChangeHotelEntity1715597395318 = void 0;
class ChangeHotelEntity1715597395318 {
    constructor() {
        this.name = 'ChangeHotelEntity1715597395318';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "description"`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "keywords"`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "wifi_name" character varying`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "wifi_password" character varying`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "front_desk_number" character varying`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "check_in_time" character varying`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "check_out_time" character varying`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "rating" integer NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "url" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "chatBot_key" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "chatBot_key" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "url" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "rating"`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "check_out_time"`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "check_in_time"`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "front_desk_number"`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "wifi_password"`);
            yield queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "wifi_name"`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "keywords" character varying`);
            yield queryRunner.query(`ALTER TABLE "hotel" ADD "description" character varying`);
        });
    }
}
exports.ChangeHotelEntity1715597395318 = ChangeHotelEntity1715597395318;
//# sourceMappingURL=1715597395318-ChangeHotelEntity.js.map