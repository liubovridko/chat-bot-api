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
exports.SearchController = void 0;
const data_source_1 = require("../data-source");
const Business_1 = require("../entity/Business");
const SearchQuery_1 = require("../entity/SearchQuery");
const Hotel_1 = require("../entity/Hotel");
class SearchController {
    constructor() {
        this.businessRepository = data_source_1.AppDataSource.getRepository(Business_1.Business);
        this.searchQueryRepository = data_source_1.AppDataSource.getRepository(SearchQuery_1.SearchQuery);
        this.hotelRepository = data_source_1.AppDataSource.getRepository(Hotel_1.Hotel);
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchQueries = yield this.searchQueryRepository
                .createQueryBuilder('searchQuery')
                .leftJoinAndSelect('searchQuery.hotel', 'hotel')
                .orderBy('searchQuery.createdAt', 'DESC')
                .getMany();
            return searchQueries;
        });
    }
    searchKeywordsInObjects(words, objects) {
        return __awaiter(this, void 0, void 0, function* () {
            let filteredObjects = [];
            objects.forEach(object => {
                if (object.keywords) {
                    object.keywords.forEach((keyword) => {
                        const keywordWords = keyword.split(" ");
                        const allWordsMatch = keywordWords.every(word => words.includes(word));
                        if (allWordsMatch) {
                            filteredObjects.push(object);
                        }
                    });
                }
            });
            const uniqueFilteredObjects = Array.from(new Set(filteredObjects.map(obj => obj.id)))
                .map(id => {
                if (typeof id === 'number' || !isNaN(Number(id))) {
                    return filteredObjects.find(obj => obj.id === id);
                }
                return null;
            })
                .filter(obj => obj !== null);
            // console.log("uniqueFilteredObjects:", uniqueFilteredObjects);
            return uniqueFilteredObjects;
        });
    }
    searchByKeywords(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = request.query;
            const { message, keyBot = "chatbot1" } = queryParams;
            try {
                const hotel = yield this.hotelRepository.findOne({ where: { chatBot_key: keyBot } });
                if (!hotel)
                    throw Error("Hotel not found");
                const searchQuery = this.searchQueryRepository.create({
                    text: message,
                    hotel: hotel
                });
                yield this.searchQueryRepository.save(searchQuery);
                const filteredObjects = yield this.businessRepository
                    .createQueryBuilder("business")
                    .where("business.hotelId = :hotelId", { hotelId: hotel.id })
                    .getMany();
                // search business
                // const filteredObjects = await this.businessRepository
                //   .createQueryBuilder("business")
                //   .where("business.hotelId = :hotelId", { hotelId: hotel.id })
                //   .andWhere((qb) => {
                //     const words = message.toLowerCase().split(/\s+/);
                //     const keywordConditions = words.map((word, index) => {
                //       const paramName = `word${index}`;
                //       qb.setParameter(paramName, `%${word}%`);
                //       return `business.keywords::text ILIKE :word${index}`;
                //     });
                //     return qb.select("business")
                //              .where(`(${keywordConditions.join(" OR ")})`);
                //   })
                //   .getMany();
                const result = yield this.searchKeywordsInObjects(message.toLowerCase().split(/\s+/), filteredObjects);
                return result;
            }
            catch (error) {
                next({ statusCode: 500, message: error.message });
            }
        });
    }
    getSearchQueryStatistic(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultData = [];
            const startDate = new Date(request.query.startDate);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(request.query.endDate);
            endDate.setHours(23, 59, 59, 999);
            const data = yield this.searchQueryRepository
                .createQueryBuilder('searchQuery')
                .select([
                "to_char(searchQuery.createdAt, 'YYYY-MM-DD') as date",
                'COUNT(*) AS count',
            ])
                .where('searchQuery.createdAt BETWEEN :dateStart AND :dateStop', {
                dateStart: startDate,
                dateStop: endDate,
            })
                .groupBy('date')
                .orderBy('date', 'ASC')
                .getRawMany();
            console.log(data);
            // Формируем результат в требуемом формате
            data.forEach((elem) => {
                resultData.push({ date: elem.date, count: Number(elem.count) });
            });
            if (!resultData.length) {
                throw Error('There is no data for the selected period');
            }
            return resultData;
        });
    }
}
exports.SearchController = SearchController;
//# sourceMappingURL=SearchController.js.map