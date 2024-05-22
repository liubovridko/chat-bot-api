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
exports.InitialMigration1713000348434 = void 0;
const typeorm_1 = require("typeorm");
class InitialMigration1713000348434 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create table User
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        default: "'user'",
                    },
                ],
            }), true);
            // Create table Hotel
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        name: "wifi_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "wifi_password",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "front_desk_number",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "check_in_time",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "check_out_time",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "rating",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "chatBot_key",
                        type: "varchar",
                    },
                ],
            }), true);
            // Create table Category
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }), true);
            // Create table Business
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }), true);
            // Create table SearchQuery
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }), true);
            // Add foreign keys
            yield queryRunner.createForeignKey("business", new typeorm_1.TableForeignKey({
                columnNames: ["categoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "CASCADE",
            }));
            yield queryRunner.createForeignKey("business", new typeorm_1.TableForeignKey({
                columnNames: ["hotelId"],
                referencedColumnNames: ["id"],
                referencedTableName: "hotel",
                onDelete: "CASCADE",
            }));
            yield queryRunner.createForeignKey("search_query", new typeorm_1.TableForeignKey({
                columnNames: ["hotelId"],
                referencedColumnNames: ["id"],
                referencedTableName: "hotel",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete foreign keys
            const businessTable = yield queryRunner.getTable("business");
            const businessCategoryForeignKey = businessTable.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
            const businessHotelForeignKey = businessTable.foreignKeys.find(fk => fk.columnNames.indexOf("hotelId") !== -1);
            const searchQueryTable = yield queryRunner.getTable("search_query");
            const searchQueryHotelForeignKey = searchQueryTable.foreignKeys.find(fk => fk.columnNames.indexOf("hotelId") !== -1);
            if (businessCategoryForeignKey) {
                yield queryRunner.dropForeignKey("business", businessCategoryForeignKey);
            }
            if (businessHotelForeignKey) {
                yield queryRunner.dropForeignKey("business", businessHotelForeignKey);
            }
            if (searchQueryHotelForeignKey) {
                yield queryRunner.dropForeignKey("search_query", searchQueryHotelForeignKey);
            }
            // Delete tables
            yield queryRunner.dropTable("user");
            yield queryRunner.dropTable("hotel");
            yield queryRunner.dropTable("category");
            yield queryRunner.dropTable("business");
            yield queryRunner.dropTable("search_query");
        });
    }
}
exports.InitialMigration1713000348434 = InitialMigration1713000348434;
//# sourceMappingURL=1713000348434-initialMigration.js.map