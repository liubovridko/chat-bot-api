"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
const data_source_1 = require("../data-source");
const Business_1 = require("../entity/Business");
const Category_1 = require("../entity/Category");
const jsonData = __importStar(require("../database/business.json"));
const Hotel_1 = require("../entity/Hotel");
class BusinessController {
    constructor() {
        this.businessRepository = data_source_1.AppDataSource.getRepository(Business_1.Business);
        this.categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
        this.hotelRepository = data_source_1.AppDataSource.getRepository(Hotel_1.Hotel);
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = request.query;
            const { keyBot = "chatbot1" } = queryParams;
            //     const hotel = await AppDataSource.getRepository(Hotel).findOne({
            //         where: { chatBot_key: keyBot },
            //     });
            //     if (!hotel) throw Error ('Hotel not found.'); 
            // const business = await this.businessRepository.find({
            //         where: { hotelId: hotel.id },
            //     });
            // return business;
            //return this.businessRepository.find();
            const queryBuilder = this.businessRepository
                .createQueryBuilder('business')
                .innerJoin(Hotel_1.Hotel, 'hotel', 'hotel.id = business.hotelId')
                .where('hotel.chatBot_key = :keyBot', { keyBot });
            const businesses = yield queryBuilder.getMany();
            if (!businesses.length) {
                throw new Error('Businesses not found.');
            }
            return businesses;
        });
    }
    getAllAdmin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = request.query;
            const { categoryId, hotelId, page, limit, order = 'ASC', orderBy = 'id' } = queryParams;
            const orderToUpper = order.toUpperCase();
            let query = this.businessRepository
                .createQueryBuilder('business')
                .leftJoinAndSelect('business.category', 'category')
                .leftJoinAndSelect('business.hotel', 'hotel');
            if (categoryId) {
                query = query.andWhere('category.id = :categoryId', { categoryId });
            }
            if (hotelId) {
                query = query.andWhere('hotel.id = :hotelId', { hotelId });
            }
            const count = yield query.getCount();
            const businesses = yield query
                // .orderBy(`business.${orderBy}`, order)
                // .skip((page - 1) * Number(limit))
                // .take(Number(limit))
                .getMany();
            if (!businesses)
                throw Error('Error retrieving businesses.');
            return { count, businesses };
        });
    }
    getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = yield this.businessRepository.findOneBy({
                id: Number(request.params.id),
            });
            if (!business)
                throw Error('Business not found.');
            return business;
        });
    }
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, url, categoryId, hotelId } = request.body;
            const business = Object.assign(new Business_1.Business(), {
                title,
                description,
                url,
                categoryId,
                hotelId
            });
            yield this.businessRepository.save(business);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield this.businessRepository.findOneBy({
                    id: Number(request.params.id),
                });
                if (!business) {
                    throw new Error('Business not found.');
                }
                this.businessRepository.merge(business, request.body);
                yield this.businessRepository.save(business);
                return { message: 'Business updated successfully.' };
                //  });
            }
            catch (error) {
                console.error('Error updating business:', error);
                throw Error('Error updating business.');
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = yield this.businessRepository.findOneBy({
                id: Number(request.params.id),
            });
            if (!business)
                throw Error('Business not found.');
            yield this.businessRepository.remove(business);
        });
    }
    parseBusiness(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.saveBusinessesFromJson(jsonData);
                response.status(200).send({ message: 'Businesses saved successfully.' });
            }
            catch (error) {
                next({ statusCode: 500, message: error.message });
            }
        });
    }
    saveBusinessesFromJson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessesData = [
                ...data.restaurants.map(b => (Object.assign(Object.assign({}, b), { categoryId: 1 }))),
                ...data.drinks.map(b => (Object.assign(Object.assign({}, b), { categoryId: 2 }))),
                ...data.activities.map(b => (Object.assign(Object.assign({}, b), { categoryId: 3 }))),
                ...data.other.map(b => (Object.assign(Object.assign({}, b), { categoryId: 4 }))),
            ];
            for (const businessData of businessesData) {
                const category = yield this.categoryRepository.findOne({ where: { id: businessData.categoryId }, });
                if (!category) {
                    throw new Error(`Category with id ${businessData.categoryId} not found.`);
                }
                // Convert keywords object to array
                const keywordsArray = Object.values(businessData.keywords);
                const business = this.businessRepository.create({
                    title: businessData.title,
                    url: businessData.url,
                    description: businessData.description,
                    keywords: keywordsArray,
                    categoryId: businessData.categoryId,
                    hotelId: 1, // Assuming hotelId is always 1
                });
                yield this.businessRepository.save(business);
            }
        });
    }
}
exports.BusinessController = BusinessController;
//# sourceMappingURL=BusinessController.js.map