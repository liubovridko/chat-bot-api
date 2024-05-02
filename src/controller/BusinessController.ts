import { AppDataSource } from "../data-source"
import { Business } from "../entity/Business";
import { Category } from "../entity/Category";
import { NextFunction, Request, Response } from "express";
import * as jsonData from '../database/business.json';
import { Hotel } from "../entity/Hotel";
import { SelectQueryBuilder } from "typeorm";


export interface QueryParams {
   categoryId?: number;
   hotelId?:number;
   page?: string;
   limit?: string;
   order?: 'ASC' | 'DESC';
   orderBy?: string;
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
             throw Error('Businesses not found.');
         }
 
         return businesses;
    }

 async getAllAdmin(request: Request, response: Response, next: NextFunction) {
      const queryParams: QueryParams = request.query;
      const { categoryId, hotelId, page , limit , order = 'ASC', orderBy = 'id' } = queryParams;
      const orderToUpper = order.toUpperCase();
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
      const count= await query.getCount();
      const businesses = await query
      // .orderBy(`business.${orderBy}`, order)
      // .skip((page - 1) * Number(limit))
      // .take(Number(limit))
      .getMany();
        

      if(!businesses) throw Error('Error retrieving businesses.'); 
      return {count, businesses};
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
          throw Error('Business not found.');
        }

          this.businessRepository.merge(business, request.body);
          await this.businessRepository.save(business);
          return { message: 'Business updated successfully.' };
      
      } catch (error) {
        console.error('Error updating business:', error);
        throw Error('Failed to update business: ' + error.message);
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
      const hotelId = await this.saveHotelFromJson(jsonData.hotel);
      await this.saveBusinessesFromJson(jsonData, hotelId);
      return { message: 'Businesses saved successfully.' };
     } catch (error) {
      throw Error('Failed to save businesses: ' + error.message);
     }
  }

  async saveHotelFromJson(hotelData: any): Promise<number> {
   console.log(hotelData)
      const hotel = Object.assign(new Hotel(), {
        title: hotelData.title,
        url: hotelData.url,
        description: hotelData.description,
        chatBot_key: hotelData.chatBot_key,
        keywords: hotelData.keywords
    });
   
    // сохраняем отель и возвращаем его идентификатор
    const savedHotel = await this.hotelRepository.save(hotel);
    return savedHotel.id;
}

    async saveBusinessesFromJson(data: any, hotelId: number) {
        const businessesData = [
            ...data.restaurants.map(b => ({ ...b, categoryId: 1 })),
            ...data.drinks.map(b => ({ ...b, categoryId: 2 })),
            ...data.activities.map(b => ({ ...b, categoryId: 3 })),
            ...data.other.map(b => ({ ...b, categoryId: 4 })),
        ];

        for (const businessData of businessesData) {
            const category = await this.categoryRepository.findOne({ where: { id: businessData.categoryId },});
            if (!category) {
                throw Error(`Category with id ${businessData.categoryId} not found.`);
            }

            // Convert keywords object to array
            const keywordsArray: string[] = Object.values(businessData.keywords);

            const business = this.businessRepository.create({
                title: businessData.title,
                url: businessData.url,
                description: businessData.description,
                keywords: keywordsArray,
                categoryId: businessData.categoryId,
                hotelId: hotelId,
            });

            await this.businessRepository.save(business);
        }
    }

      
}
