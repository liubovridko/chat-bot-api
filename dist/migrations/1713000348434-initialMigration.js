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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1713000348434 = void 0;
var typeorm_1 = require("typeorm");
var InitialMigration1713000348434 = /** @class */ (function () {
    function InitialMigration1713000348434() {
    }
    InitialMigration1713000348434.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Create table User
                    return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                            name: "user",
                            columns: [
                                {
                                    name: "id",
                                    type: "int",
                                    isPrimary: true,
                                    isGenerated: true,
                                    generationStrategy: "increment",
                                },
                                {
                                    name: "firstName",
                                    type: "varchar",
                                    isNullable: true,
                                },
                                {
                                    name: "lastName",
                                    type: "varchar",
                                    isNullable: true,
                                },
                                {
                                    name: "email",
                                    type: "varchar",
                                },
                                {
                                    name: "password",
                                    type: "varchar",
                                },
                                {
                                    name: "role",
                                    type: "varchar",
                                    default: "'ghost'",
                                },
                            ],
                        }), true)];
                    case 1:
                        // Create table User
                        _a.sent();
                        // Create table Hotel
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: "hotel",
                                columns: [
                                    {
                                        name: "id",
                                        type: "int",
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: "increment",
                                    },
                                    {
                                        name: "title",
                                        type: "varchar",
                                    },
                                    {
                                        name: "url",
                                        type: "varchar",
                                        isNullable: true,
                                    },
                                    {
                                        name: "description",
                                        type: "varchar",
                                        isNullable: true,
                                    },
                                    {
                                        name: "keywords",
                                        type: "varchar",
                                        isArray: true,
                                        isNullable: true,
                                    },
                                    {
                                        name: "price",
                                        type: "int",
                                        isNullable: true,
                                    },
                                    {
                                        name: "chatBot_key",
                                        type: "varchar",
                                    },
                                ],
                            }), true)];
                    case 2:
                        // Create table Hotel
                        _a.sent();
                        // Create table Category
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: "category",
                                columns: [
                                    {
                                        name: "id",
                                        type: "int",
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: "increment",
                                    },
                                    {
                                        name: "name",
                                        type: "varchar",
                                    },
                                ],
                            }), true)];
                    case 3:
                        // Create table Category
                        _a.sent();
                        // Create table Business
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: "business",
                                columns: [
                                    {
                                        name: "id",
                                        type: "int",
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: "increment",
                                    },
                                    {
                                        name: "title",
                                        type: "varchar",
                                        isNullable: true,
                                    },
                                    {
                                        name: "url",
                                        type: "varchar",
                                        isNullable: true,
                                    },
                                    {
                                        name: "image",
                                        type: "varchar",
                                        isNullable: true,
                                    },
                                    {
                                        name: "description",
                                        type: "varchar",
                                        isNullable: true,
                                    },
                                    {
                                        name: "keywords",
                                        type: "varchar",
                                        isArray: true,
                                        isNullable: true,
                                    },
                                    {
                                        name: "price",
                                        type: "int",
                                        isNullable: true,
                                    },
                                    {
                                        name: "categoryId",
                                        type: "int",
                                    },
                                    {
                                        name: "hotelId",
                                        type: "int",
                                    },
                                ],
                            }), true)];
                    case 4:
                        // Create table Business
                        _a.sent();
                        // Create table SearchQuery
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: "search_query",
                                columns: [
                                    {
                                        name: "id",
                                        type: "int",
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: "increment",
                                    },
                                    {
                                        name: "text",
                                        type: "varchar",
                                    },
                                    {
                                        name: "createdAt",
                                        type: "timestamp",
                                        default: "CURRENT_TIMESTAMP",
                                    },
                                    {
                                        name: "hotelId",
                                        type: "int",
                                    },
                                ],
                            }), true)];
                    case 5:
                        // Create table SearchQuery
                        _a.sent();
                        // Add foreign keys
                        return [4 /*yield*/, queryRunner.createForeignKey("business", new typeorm_1.TableForeignKey({
                                columnNames: ["categoryId"],
                                referencedColumnNames: ["id"],
                                referencedTableName: "category",
                                onDelete: "CASCADE",
                            }))];
                    case 6:
                        // Add foreign keys
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey("business", new typeorm_1.TableForeignKey({
                                columnNames: ["hotelId"],
                                referencedColumnNames: ["id"],
                                referencedTableName: "hotel",
                                onDelete: "CASCADE",
                            }))];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey("search_query", new typeorm_1.TableForeignKey({
                                columnNames: ["hotelId"],
                                referencedColumnNames: ["id"],
                                referencedTableName: "hotel",
                                onDelete: "CASCADE",
                            }))];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitialMigration1713000348434.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var businessTable, businessCategoryForeignKey, businessHotelForeignKey, searchQueryTable, searchQueryHotelForeignKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.getTable("business")];
                    case 1:
                        businessTable = _a.sent();
                        businessCategoryForeignKey = businessTable.foreignKeys.find(function (fk) { return fk.columnNames.indexOf("categoryId") !== -1; });
                        businessHotelForeignKey = businessTable.foreignKeys.find(function (fk) { return fk.columnNames.indexOf("hotelId") !== -1; });
                        return [4 /*yield*/, queryRunner.getTable("search_query")];
                    case 2:
                        searchQueryTable = _a.sent();
                        searchQueryHotelForeignKey = searchQueryTable.foreignKeys.find(function (fk) { return fk.columnNames.indexOf("hotelId") !== -1; });
                        if (!businessCategoryForeignKey) return [3 /*break*/, 4];
                        return [4 /*yield*/, queryRunner.dropForeignKey("business", businessCategoryForeignKey)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!businessHotelForeignKey) return [3 /*break*/, 6];
                        return [4 /*yield*/, queryRunner.dropForeignKey("business", businessHotelForeignKey)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!searchQueryHotelForeignKey) return [3 /*break*/, 8];
                        return [4 /*yield*/, queryRunner.dropForeignKey("search_query", searchQueryHotelForeignKey)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: 
                    // Delete tables
                    return [4 /*yield*/, queryRunner.dropTable("user")];
                    case 9:
                        // Delete tables
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropTable("hotel")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropTable("category")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropTable("business")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropTable("search_query")];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return InitialMigration1713000348434;
}());
exports.InitialMigration1713000348434 = InitialMigration1713000348434;
//# sourceMappingURL=1713000348434-initialMigration.js.map