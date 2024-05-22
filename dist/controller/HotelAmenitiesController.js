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
exports.HotelAmenitiesController = void 0;
const data_source_1 = require("../data-source");
const HotelAmenities_1 = require("../entity/HotelAmenities");
class HotelAmenitiesController {
    constructor() {
        this.amenitiesRepository = data_source_1.AppDataSource.getRepository(HotelAmenities_1.HotelAmenities);
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const amenitiesQuery = yield this.amenitiesRepository
                .createQueryBuilder('amenities')
                .leftJoinAndSelect('amenities.hotel', 'hotel')
                .orderBy('amenities.id', 'ASC')
                .getMany();
            return amenitiesQuery;
        });
    }
    getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const amenity = yield this.amenitiesRepository.findOneBy({ id: Number(request.params.id) });
            if (!amenity) {
                const error = new Error("Hotel Amenity not found!");
                error.statusCode = 404;
                throw error;
            }
            return amenity;
        });
    }
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amenity_type, available, hours, hotelId } = request.body;
            const amenity = Object.assign(new HotelAmenities_1.HotelAmenities(), {
                amenity_type,
                available,
                hours,
                hotelId
            });
            yield this.amenitiesRepository.save(amenity);
            return this.amenitiesRepository.findOne({ where: { id: amenity.id }, relations: ['hotel'] });
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const amenity = yield this.amenitiesRepository.findOneBy({ id: Number(request.params.id) });
                if (!amenity) {
                    const error = new Error('Hotel amenity not found');
                    error.statusCode = 404;
                    throw error;
                }
                this.amenitiesRepository.merge(amenity, request.body);
                yield this.amenitiesRepository.save(amenity);
                return this.amenitiesRepository.findOne({ where: { id: amenity.id }, relations: ['hotel'] });
            }
            catch (error) {
                console.log('Erorr updating hotel amenity: ', error);
                throw Error('Failed to update hotel amenity: ' + error.message);
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const amenityToRemove = yield this.amenitiesRepository.findOneBy({ id: Number(request.params.id) });
            if (!amenityToRemove) {
                const error = new Error('Hotel amenity not found');
                error.statusCode = 404;
                throw error;
            }
            yield this.amenitiesRepository.remove(amenityToRemove);
            return 'Hotel amenity has been removed';
        });
    }
}
exports.HotelAmenitiesController = HotelAmenitiesController;
//# sourceMappingURL=HotelAmenitiesController.js.map