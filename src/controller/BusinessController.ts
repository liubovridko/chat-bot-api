import { AppDataSource } from "../data-source"
import { Business } from "../entity/Business";
import { Category } from "../entity/Category";
import { NextFunction, Request, Response } from "express";
import * as jsonData from '../database/db.json';
import { Hotel } from "../entity/Hotel";
import { SelectQueryBuilder } from "typeorm";


export interface QueryParams {
   categoryId?: number;
   hotelId?:number;
   page?: number;
   limit?: number;
   message?: string;
   keyBot?: string;
 }
 

export class BusinessController {
    private businessRepository = AppDataSource.getRepository(Business);
    private categoryRepository = AppDataSource.getRepository(Category);
    private hotelRepository = AppDataSource.getRepository(Hotel);


   async getAll(request: Request, response: Response, next: NextFunction) {

        const queryParams: QueryParams = request.query;
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

         const queryBuilder: SelectQueryBuilder<Business> = this.businessRepository
         .createQueryBuilder('business')
         .innerJoin(Hotel, 'hotel', 'hotel.id = business.hotelId')
         .where('hotel.chatBot_key = :keyBot', { keyBot });
 
         const businesses = await queryBuilder.getMany();
         
         if (!businesses.length) {
             throw new Error('Businesses not found.');
         }
 
         return businesses;
    }

 async getAllAdmin(request: Request, response: Response, next: NextFunction) {
      const queryParams: QueryParams = request.query;
      const { categoryId, hotelId } = queryParams;

      let query: SelectQueryBuilder<Business> = this.businessRepository
          .createQueryBuilder('business')
          .leftJoinAndSelect('business.category', 'category')
          .leftJoinAndSelect('business.hotel', 'hotel')

      if (categoryId) {
          query = query.andWhere('category.id = :categoryId', { categoryId });
      }

      if (hotelId) {
        query = query.andWhere('hotel.id = :hotelId', { hotelId });
    }

      const businesses = await query
        //  .skip((page - 1) * limit)
        //  .take(limit)
         .getMany();

      if(!businesses) throw Error('Error retrieving businesses.'); 
      return businesses;
}
       
                  
   async getOne(request: Request, response: Response, next: NextFunction) {
       
            const business = await this.businessRepository.findOneBy({
               id: Number(request.params.id),
           });
           
            if (!business) throw Error('Business not found.'); 
            return business;
   }

   async create(request: Request, response: Response, next: NextFunction) {
         const { title, description, url, categoryId, hotelId } = request.body;

         const business = Object.assign(new Business(), {
            title,
            description,
            url,
            categoryId,
            hotelId
         })
         await this.businessRepository.save(business);
      
   }

   async update(request: Request, response: Response, next: NextFunction) {
    try {
        const business = await this.businessRepository.findOneBy({
          id: Number(request.params.id),
        });
    
        if (!business) {
          throw new Error('Business not found.');
        }

          this.businessRepository.merge(business, request.body);
          await this.businessRepository.save(business);
    
          // Отправляем успешный ответ
          return { message: 'Business updated successfully.' };
      //  });
      
      } catch (error) {
        // Обработка ошибок
        console.error('Error updating business:', error);
       // response.status(500).json({ error: 'Error updating business.' });
        throw Error('Error updating business.');
      }  
   }

   async remove(request: Request, response: Response, next: NextFunction) {
        
        const business = await this.businessRepository.findOneBy({
               id: Number(request.params.id),
           });
           if (!business) throw Error ('Business not found.');
            await this.businessRepository.remove(business);
     
   }
    async parseBusiness(request: Request, response: Response, next: NextFunction) {
      try {
         await this.saveBusinessesFromJson(jsonData);
         response.status(200).send({ message: 'Businesses saved successfully.' });
     } catch (error) {
         next({ statusCode: 500, message: error.message });
     }
  }

    async saveBusinessesFromJson(data: any) {
        const businessesData = [
            ...data.restaurants.map(b => ({ ...b, categoryId: 1 })),
            ...data.drinks.map(b => ({ ...b, categoryId: 2 })),
            ...data.activities.map(b => ({ ...b, categoryId: 3 })),
            ...data.other.map(b => ({ ...b, categoryId: 4 })),
        ];

        for (const businessData of businessesData) {
            const category = await this.categoryRepository.findOne({ where: { id: businessData.categoryId },});
            if (!category) {
                throw new Error(`Category with id ${businessData.categoryId} not found.`);
            }

            // Convert keywords object to array
            const keywordsArray: string[] = Object.values(businessData.keywords);

            const business = this.businessRepository.create({
                title: businessData.title,
                url: businessData.url,
                description: businessData.description,
                keywords: keywordsArray,
                categoryId: businessData.categoryId,
                hotelId: 1, // Assuming hotelId is always 1
            });

            await this.businessRepository.save(business);
        }
    }

      
}
