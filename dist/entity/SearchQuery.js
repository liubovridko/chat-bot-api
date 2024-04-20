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
exports.SearchQuery = void 0;
var typeorm_1 = require("typeorm");
var Hotel_1 = require("./Hotel");
var SearchQuery = /** @class */ (function () {
    function SearchQuery() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SearchQuery.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], SearchQuery.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Hotel_1.Hotel; }, function (hotel) { return hotel.searchQueries; }),
        (0, typeorm_1.JoinColumn)({ name: 'hotelId' }),
        __metadata("design:type", Hotel_1.Hotel)
    ], SearchQuery.prototype, "hotel", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } }),
        __metadata("design:type", Date)
    ], SearchQuery.prototype, "createdAt", void 0);
    SearchQuery = __decorate([
        (0, typeorm_1.Entity)('search_query')
    ], SearchQuery);
    return SearchQuery;
}());
exports.SearchQuery = SearchQuery;
//# sourceMappingURL=SearchQuery.js.map