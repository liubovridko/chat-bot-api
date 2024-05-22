import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { HotelAmenities } from "../entity/HotelAmenities";
import { Hotel } from "../entity/Hotel";

export class HotelAmenitiesController {
   private amenitiesRepository = AppDataSource.getRepository(HotelAmenities);

   async getAll(request: Request, response: Response, next: NextFunction) {

     const amenitiesQuery = await this.amenitiesRepository
     .createQueryBuilder('amenities')
     .leftJoinAndSelect('amenities.hotel', 'hotel')
     .orderBy('amenities.id', 'ASC')
     .getMany();
      return amenitiesQuery;
   }

   async getOne(request: Request, response: Response, next: NextFunction) {
     const amenity = await this.amenitiesRepository.findOneBy({id: Number(request.params.id)});

     if(!amenity) {
      const error = new Error("Hotel Amenity not found!");
      (error as any).statusCode = 404;
      throw error;
     }

     return amenity;
   }

   async create(request: Request, response: Response, next: NextFunction) {
      const { amenity_type, available, hours, hotelId } = request.body;
      const amenity = Object.assign( new HotelAmenities(), {
         amenity_type,
         available,
         hours,
         hotelId
      });

      await this.amenitiesRepository.save(amenity);
      return this.amenitiesRepository.findOne({ where:{id:amenity.id}, relations: ['hotel']});
   }

   async update(request: Request, response: Response, next: NextFunction) {
      try {
         const amenity = await this.amenitiesRepository.findOneBy({id: Number(request.params.id)});
         if(!amenity) {
            const error = new Error('Hotel amenity not found');
            (error as any).statusCode = 404;
            throw error;
         }
         this.amenitiesRepository.merge(amenity, request.body);
         await this.amenitiesRepository.save(amenity);
         return this.amenitiesRepository.findOne({ where:{id:amenity.id}, relations: ['hotel']});
         
      } catch (error) {
         console.log('Erorr updating hotel amenity: ', error);
         throw Error('Failed to update hotel amenity: ' + error.message);
         
      }
   }
   async remove(request: Request, response: Response, next: NextFunction) {
      const amenityToRemove = await this.amenitiesRepository.findOneBy({id: Number(request.params.id)});
      if(!amenityToRemove) {
         const error = new Error('Hotel amenity not found');
         (error as any).statusCode = 404;
         throw error;
      }
      await this.amenitiesRepository.remove(amenityToRemove);
      return 'Hotel amenity has been removed';
   }
}