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
exports.CreateReviewEntity1715440913429 = void 0;
class CreateReviewEntity1715440913429 {
    constructor() {
        this.name = 'CreateReviewEntity1715440913429';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "userName" character varying, "textReview" character varying NOT NULL, "hotelId" integer NOT NULL, "rating" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_86bed2411a875eb84306554f946" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_86bed2411a875eb84306554f946"`);
            yield queryRunner.query(`DROP TABLE "review"`);
        });
    }
}
exports.CreateReviewEntity1715440913429 = CreateReviewEntity1715440913429;
//# sourceMappingURL=1715440913429-CreateReviewEntity.js.map