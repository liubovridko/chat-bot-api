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
const HotelAmenities_1 = require("../entity/HotelAmenities");
class BusinessController {
    constructor() {
        this.businessRepository = data_source_1.AppDataSource.getRepository(Business_1.Business);
        this.categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
        this.hotelRepository = data_source_1.AppDataSource.getRepository(Hotel_1.Hotel);
        this.hotelAmenitiesRepository = data_source_1.AppDataSource.getRepository(HotelAmenities_1.HotelAmenities);
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = request.query;
            const { keyBot = "chatbot1" } = queryParams;
            const queryBuilder = this.businessRepository
                .createQueryBuilder('business')
                .innerJoin(Hotel_1.Hotel, 'hotel', 'hotel.id = business.hotelId')
                .where('hotel.chatBot_key = :keyBot', { keyBot });
            const businesses = yield queryBuilder.getMany();
            //  if (!businesses.length) {
            //   const error = new Error('businesses not found');
            //   (error as any).statusCode = 404; 
            //   throw error;
            //  }
            return businesses;
        });
    }
    getAllAdmin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = request.query;
            const { categoryId, hotelId, page, limit, order = 'ASC', orderBy = 'id' } = queryParams;
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
            return { count, businesses };
        });
    }
    getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = yield this.businessRepository.findOneBy({
                id: Number(request.params.id),
            });
            if (!business) {
                const error = new Error('Business not found.');
                error.statusCode = 404;
                throw error;
            }
            ;
            return business;
        });
    }
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, url, image, keywords, price, categoryId, hotelId } = request.body;
            const keywordsArray = keywords ? keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword !== '') : null;
            const parsedPrice = price !== '' ? price : null;
            const business = Object.assign(new Business_1.Business(), {
                title,
                description,
                url,
                image,
                keywords: keywordsArray,
                price: parsedPrice,
                categoryId,
                hotelId
            });
            yield this.businessRepository.save(business);
            return business;
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield this.businessRepository.findOneBy({
                    id: Number(request.params.id),
                });
                if (!business) {
                    const error = new Error('Business not found.');
                    error.statusCode = 404;
                    throw error;
                }
                // We divide the keywords into an array of strings, removing extra spaces
                if (typeof request.body.keywords === 'string' && request.body.keywords.trim() !== '') {
                    let keywordsArray = request.body.keywords.split(',').map(keyword => keyword.trim());
                    // Delete empty words
                    keywordsArray = keywordsArray.filter(keyword => keyword !== '');
                    request.body.keywords = keywordsArray;
                }
                else {
                    request.body.keywords = null;
                }
                this.businessRepository.merge(business, request.body);
                yield this.businessRepository.save(business);
                return { message: 'Business updated successfully.' };
            }
            catch (error) {
                console.error('Error updating business:', error);
                throw Error('Failed to update business: ' + error.message);
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = yield this.businessRepository.findOneBy({
                id: Number(request.params.id),
            });
            if (!business) {
                const error = new Error('Business not found.');
                error.statusCode = 404;
                throw error;
            }
            yield this.businessRepository.remove(business);
        });
    }
    parseBusiness(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hotelId = yield this.saveHotelFromJson(jsonData.hotel);
                // Execute saveHotelAmenitieslFromJson and saveBusinessesFromJson concurrently
                yield Promise.all([
                    yield this.saveHotelAmenitieslFromJson(jsonData.hotel.amenities, hotelId),
                    yield this.saveBusinessesFromJson(jsonData, hotelId),
                ]);
                return { message: 'Businesses saved successfully.' };
            }
            catch (error) {
                throw Error('Failed to save businesses: ' + error.message);
            }
        });
    }
    saveHotelFromJson(hotelData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotel = Object.assign(new Hotel_1.Hotel(), {
                title: hotelData.title,
                url: hotelData.url,
                wifi_name: hotelData.wifi.name,
                wifi_password: hotelData.wifi.password,
                front_desk_number: hotelData.phone,
                check_in_time: hotelData.checkIn,
                check_out_time: hotelData.checkOut,
                chatBot_key: hotelData.chatBot_key
            });
            // Save hotel and return hotelId
            const savedHotel = yield this.hotelRepository.save(hotel);
            return savedHotel.id;
        });
    }
    saveHotelAmenitieslFromJson(amenitiesData, hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const amenityType in amenitiesData) {
                if (amenitiesData.hasOwnProperty(amenityType)) {
                    const amenity = amenitiesData[amenityType];
                    const amenityData = this.hotelAmenitiesRepository.create({
                        amenity_type: amenityType,
                        available: amenity.available,
                        hours: amenity.hours,
                        hotelId: hotelId
                    });
                    yield this.hotelAmenitiesRepository.save(amenityData);
                }
            }
        });
    }
    saveBusinessesFromJson(data, hotelId) {
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
                    const error = new Error(`Category with id ${businessData.categoryId} not found.`);
                    error.statusCode = 404;
                    throw error;
                }
                // Convert keywords object to array
                const keywordsArray = Object.values(businessData.keywords);
                const business = this.businessRepository.create({
                    title: businessData.title,
                    url: businessData.url,
                    description: businessData.description,
                    keywords: keywordsArray,
                    categoryId: businessData.categoryId,
                    hotelId: hotelId,
                });
                yield this.businessRepository.save(business);
            }
        });
    }
}
exports.BusinessController = BusinessController;
//# sourceMappingURL=BusinessController.js.map