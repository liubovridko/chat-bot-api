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
exports.CategoryController = void 0;
const data_source_1 = require("../data-source");
const Category_1 = require("../entity/Category");
class CategoryController {
    constructor() {
        this.categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.findOneBy({ id: Number(request.params.id) });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.body;
            const category = Object.assign(new Category_1.Category(), {
                name,
            });
            return this.categoryRepository.save(category);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const id = parseInt(request.params.id)
            const categoryToRemove = yield this.categoryRepository.findOneBy({ id: Number(request.params.id) });
            if (!categoryToRemove)
                throw Error('user does not exist');
            // if (!userToRemove) {
            //     return "this user not exist"
            // }
            yield this.categoryRepository.remove(categoryToRemove);
            //return "user has been removed"
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map