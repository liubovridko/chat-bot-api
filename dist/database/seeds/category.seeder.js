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
const Category_1 = require("../../entity/Category");
class CategorySeeder {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = dataSource.getRepository(Category_1.Category);
            const categoriesData = [
                { name: 'restaurants' },
                { name: 'drinks' },
                { name: 'activities' },
                { name: 'other' }
            ];
            // Check if categories already exist, insert only if not.
            for (const categoryData of categoriesData) {
                const category = yield repository.findOne({ where: { name: categoryData.name } });
                if (!category) {
                    yield repository.insert(categoryData);
                }
            }
        });
    }
}
exports.default = CategorySeeder;
//# sourceMappingURL=category.seeder.js.map