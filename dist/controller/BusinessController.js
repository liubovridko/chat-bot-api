"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
var data_source_1 = require("../data-source");
var Business_1 = require("../entity/Business");
var Category_1 = require("../entity/Category");
var jsonData = __importStar(require("../database/db.json"));
var BusinessController = /** @class */ (function () {
    function BusinessController() {
        this.businessRepository = data_source_1.AppDataSource.getRepository(Business_1.Business);
        this.categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
    }
    BusinessController.prototype.getAll = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var botKey;
            return __generator(this, function (_a) {
                botKey = request.query.botKey;
                // if (botKey) {
                //     const hotel = await AppDataSource.getRepository(Hotel).findOne({
                //         where: { chatBot_key: botKey },
                //     });
                //     if (!hotel) throw Error ('Hotel not found.'); 
                //     await this.businessRepository.find({
                //         where: { hotelId: hotel.id },
                //     });
                // }
                return [2 /*return*/, this.businessRepository.find()];
            });
        });
    };
    BusinessController.prototype.getAllAdmin = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, categoryId, _a, page, _b, limit, query, businesses;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        queryParams = request.query;
                        categoryId = queryParams.categoryId, _a = queryParams.page, page = _a === void 0 ? 1 : _a, _b = queryParams.limit, limit = _b === void 0 ? 10 : _b;
                        query = this.businessRepository
                            .createQueryBuilder('business')
                            .skip((page - 1) * limit)
                            .take(limit);
                        if (categoryId) {
                            query = query.innerJoinAndSelect('business.category', 'category')
                                .where('category.id = :categoryId', { categoryId: categoryId });
                        }
                        return [4 /*yield*/, query.getMany()];
                    case 1:
                        businesses = _c.sent();
                        if (!businesses)
                            throw Error('Error retrieving businesses.');
                        return [2 /*return*/, businesses];
                }
            });
        });
    };
    BusinessController.prototype.getOne = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessRepository.findOneBy({
                            id: Number(request.params.id),
                        })];
                    case 1:
                        business = _a.sent();
                        if (!business)
                            throw Error('Business not found.');
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessController.prototype.create = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, url, categoryId, hotelId, business;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, title = _a.title, description = _a.description, url = _a.url, categoryId = _a.categoryId, hotelId = _a.hotelId;
                        business = Object.assign(new Business_1.Business(), {
                            title: title,
                            description: description,
                            url: url,
                            categoryId: categoryId,
                            hotelId: hotelId
                        });
                        return [4 /*yield*/, this.businessRepository.save(business)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessController.prototype.update = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessRepository.findOneBy({
                            id: Number(request.params.id),
                        })];
                    case 1:
                        business = _a.sent();
                        if (!business)
                            throw Error('Business not found.');
                        this.businessRepository.merge(business, request.body);
                        return [4 /*yield*/, this.businessRepository.save(business)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessRepository.findOneBy({
                            id: Number(request.params.id),
                        })];
                    case 1:
                        business = _a.sent();
                        if (!business)
                            throw Error('Business not found.');
                        return [4 /*yield*/, this.businessRepository.remove(business)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessController.prototype.parseBusiness = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.saveBusinessesFromJson(jsonData)];
                    case 1:
                        _a.sent();
                        response.status(200).send({ message: 'Businesses saved successfully.' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next({ statusCode: 500, message: error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BusinessController.prototype.saveBusinessesFromJson = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var businessesData, _i, businessesData_1, businessData, category, keywordsArray, business;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        businessesData = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], data.restaurants.map(function (b) { return (__assign(__assign({}, b), { categoryId: 1 })); }), true), data.drinks.map(function (b) { return (__assign(__assign({}, b), { categoryId: 2 })); }), true), data.activities.map(function (b) { return (__assign(__assign({}, b), { categoryId: 3 })); }), true), data.other.map(function (b) { return (__assign(__assign({}, b), { categoryId: 4 })); }), true);
                        _i = 0, businessesData_1 = businessesData;
                        _a.label = 1;
                    case 1:
                        if (!(_i < businessesData_1.length)) return [3 /*break*/, 5];
                        businessData = businessesData_1[_i];
                        return [4 /*yield*/, this.categoryRepository.findOne({ where: { id: businessData.categoryId }, })];
                    case 2:
                        category = _a.sent();
                        if (!category) {
                            throw new Error("Category with id ".concat(businessData.categoryId, " not found."));
                        }
                        keywordsArray = Object.values(businessData.keywords);
                        business = this.businessRepository.create({
                            title: businessData.title,
                            url: businessData.url,
                            description: businessData.description,
                            keywords: keywordsArray,
                            categoryId: businessData.categoryId,
                            hotelId: 1, // Assuming hotelId is always 1
                        });
                        return [4 /*yield*/, this.businessRepository.save(business)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return BusinessController;
}());
exports.BusinessController = BusinessController;
//# sourceMappingURL=BusinessController.js.map