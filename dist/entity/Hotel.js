"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
var typeorm_1 = require("typeorm");
var Business_1 = require("./Business");
var SearchQuery_1 = require("./SearchQuery");
var Hotel = /** @class */ (function () {
    function Hotel() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Hotel.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Hotel.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Hotel.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Hotel.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', array: true, nullable: true }),
        __metadata("design:type", Array)
    ], Hotel.prototype, "keywords", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Hotel.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Hotel.prototype, "chatBot_key", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Business_1.Business; }, function (business) { return business.hotel; }),
        __metadata("design:type", Array)
    ], Hotel.prototype, "businesses", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return SearchQuery_1.SearchQuery; }, function (searchQuery) { return searchQuery.hotel; }),
        __metadata("design:type", Array)
    ], Hotel.prototype, "searchQueries", void 0);
    Hotel = __decorate([
        (0, typeorm_1.Entity)()
    ], Hotel);
    return Hotel;
}());
exports.Hotel = Hotel;
//# sourceMappingURL=Hotel.js.map