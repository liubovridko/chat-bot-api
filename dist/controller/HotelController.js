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
exports.HotelController = void 0;
const data_source_1 = require("../data-source");
const Hotel_1 = require("../entity/Hotel");
class HotelController {
    constructor() {
        this.hotelRepository = data_source_1.AppDataSource.getRepository(Hotel_1.Hotel);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = request.query;
            const { keyBot = "chatbot1" } = queryParams;
            return this.hotelRepository.findOne({ where: { chatBot_key: keyBot } });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, description, chatBot_key } = request.body;
            const hotel = Object.assign(new Hotel_1.Hotel(), {
                title,
                url,
                description,
                chatBot_key
            });
            return this.hotelRepository.save(hotel);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const id = parseInt(request.params.id)
            const hotelToRemove = yield this.hotelRepository.findOneBy({ id: parseInt(request.params.id) });
            if (!hotelToRemove) {
                const error = new Error('Hotel not found');
                error.statusCode = 404;
                throw error;
            }
            yield this.hotelRepository.remove(hotelToRemove);
            return "Hotel has been removed";
        });
    }
}
exports.HotelController = HotelController;
//# sourceMappingURL=HotelController.js.map