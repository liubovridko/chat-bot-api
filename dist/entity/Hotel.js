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
const typeorm_1 = require("typeorm");
const Business_1 = require("./Business");
const Review_1 = require("./Review");
const SearchQuery_1 = require("./SearchQuery");
const HotelAmenities_1 = require("./HotelAmenities");
let Hotel = class Hotel {
    updateRating() {
        if (this.reviews && this.reviews.length > 0) {
            const totalRating = this.reviews.reduce((acc, curr) => acc + curr.rating, 0);
            const averageRating = totalRating / this.reviews.length;
            this.rating = Math.round(averageRating);
        }
        else {
            this.rating = 0;
        }
    }
};
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
], Hotel.prototype, "wifi_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "wifi_password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "front_desk_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "check_in_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "check_out_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Hotel.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Hotel.prototype, "chatBot_key", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Business_1.Business, business => business.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "businesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SearchQuery_1.SearchQuery, searchQuery => searchQuery.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "searchQueries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HotelAmenities_1.HotelAmenities, amenities => amenities.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, review => review.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Hotel.prototype, "updateRating", null);
Hotel = __decorate([
    (0, typeorm_1.Entity)()
], Hotel);
exports.Hotel = Hotel;
//# sourceMappingURL=Hotel.js.map