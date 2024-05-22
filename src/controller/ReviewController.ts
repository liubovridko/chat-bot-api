import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction, query } from "express";
import { Review } from "../entity/Review";
import { Hotel } from "../entity/Hotel";

export class ReviewController {
   private reviewRepository = AppDataSource.getRepository(Review);
   private hotelRepository = AppDataSource.getRepository(Hotel);

   async all(request:Request, response:Response, next:NextFunction) {
      //return this.reviewRepository.find({relations:{ hotel: true}});
      const reviewQuery = this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.hotel', 'hotel')
        .orderBy('review.createdAt', 'DESC')
        .getMany();
        return reviewQuery;
   }

   async one(request:Request, response:Response, next:NextFunction) {
      const review = await  this.reviewRepository.findOneBy({
         id: Number(request.params.id)
      });
      if(!review) {
         const error = new Error(`Review by id ${request.params.id} was not found`);
         (error as any).statusCode = 404;
         throw error;
      }
      return review;
   }

   async create(request: Request, response: Response, next: NextFunction){
      const { keyBot } = request.params;

      const { rating, userName, textReview } = request.body;
      const hotel = await this.hotelRepository.findOne({
        where:{ chatBot_key: keyBot}
      });
 
      if(!hotel) {
         const error = new Error("Hotel not found");
         (error as any).statusCode = 404;
         throw error;
      }
   
      const review = Object.assign(new Review(), {
         rating,
         userName,
         textReview,
         hotelId:hotel.id
      });
      await  this.reviewRepository.save(review);
      return {message: "Reviev was save successfully!"};
   }
}