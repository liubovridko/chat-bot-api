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
exports.ReviewController = void 0;
const data_source_1 = require("../data-source");
const Review_1 = require("../entity/Review");
const Hotel_1 = require("../entity/Hotel");
class ReviewController {
    constructor() {
        this.reviewRepository = data_source_1.AppDataSource.getRepository(Review_1.Review);
        this.hotelRepository = data_source_1.AppDataSource.getRepository(Hotel_1.Hotel);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.reviewRepository.find({relations:{ hotel: true}});
            const reviewQuery = this.reviewRepository
                .createQueryBuilder('review')
                .leftJoinAndSelect('review.hotel', 'hotel')
                .orderBy('review.createdAt', 'DESC')
                .getMany();
            return reviewQuery;
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield this.reviewRepository.findOneBy({
                id: Number(request.params.id)
            });
            if (!review) {
                const error = new Error(`Review by id ${request.params.id} was not found`);
                error.statusCode = 404;
                throw error;
            }
            return review;
        });
    }
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { keyBot = "chatbot1" } = request.params;
            const { rating, userName, textReview } = request.body;
            const hotel = yield this.hotelRepository.findOne({
                where: { chatBot_key: keyBot }
            });
            if (!hotel) {
                const error = new Error("Hotel not found");
                error.statusCode = 404;
                throw error;
            }
            const review = Object.assign(new Review_1.Review(), {
                rating,
                userName,
                textReview,
                hotelId: hotel.id
            });
            yield this.reviewRepository.save(review);
            return { message: "Reviev was save successfully!" };
        });
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=ReviewController.js.map