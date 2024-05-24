import { AppDataSource } from "../data-source"
import { Business } from "../entity/Business";
import { Category } from "../entity/Category";
import { NextFunction, Request, Response } from "express";
import * as jsonData from '../database/business.json';
import { Hotel } from "../entity/Hotel";
import { HotelAmenities } from "../entity/HotelAmenities";
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
    private hotelAmenitiesRepository = AppDataSource.getRepository(HotelAmenities);


   async getAll(request: Request, response: Response, next: NextFunction) {

        const queryParams: QueryParams = request.query;
        const { keyBot = "chatbot1" } = queryParams;

         const queryBuilder: SelectQueryBuilder<Business> = this.businessRepository
         .createQueryBuilder('business')
         .innerJoin(Hotel, 'hotel', 'hotel.id = business.hotelId')
         .where('hotel.chatBot_key = :keyBot', { keyBot });
 
         const businesses = await queryBuilder.getMany();
         
        //  if (!businesses.length) {
        //   const error = new Error('businesses not found');
        //   (error as any).statusCode = 404; 
        //   throw error;
        //  }
 
         return businesses;
    }

 async getAllAdmin(request: Request, response: Response, next: NextFunction) {
      const queryParams: QueryParams = request.query;
      const { categoryId, hotelId, page , limit , order = 'ASC', orderBy = 'id' } = queryParams;
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
         
      return {count, businesses};
}
       
                  
   async getOne(request: Request, response: Response, next: NextFunction) {
       
            const business = await this.businessRepository.findOneBy({
               id: Number(request.params.id),
           });
           
            if (!business) {
              const error = new Error('Business not found.');
              (error as any).statusCode = 404; 
              throw error;
            };

            return business;
   }

   async create(request: Request, response: Response, next: NextFunction) {
         const { title, description, url, image, keywords, price, categoryId, hotelId } = request.body;
      
         const keywordsArray = keywords ? keywords.split(',').map((keyword: string) => keyword.trim()).filter((keyword: string) => keyword !== '') : null;
         const parsedPrice = price !== '' ? price : null;

         const business = Object.assign(new Business(), {
            title,
            description,
            url,
            image,
            keywords:keywordsArray,
            price:parsedPrice,
            categoryId, 
            hotelId 
         })
         await this.businessRepository.save(business);
         return business;
      
   }

   async update(request: Request, response: Response, next: NextFunction) {
    try {
        const business = await this.businessRepository.findOneBy({
          id: Number(request.params.id), 
        });
    
        if (!business) {
            const error = new Error('Business not found.');
            (error as any).statusCode = 404; 
            throw error;
        }

          // We divide the keywords into an array of strings, removing extra spaces
          if (typeof request.body.keywords === 'string' && request.body.keywords.trim() !== '') {
            let keywordsArray = request.body.keywords.split(',').map((keyword :string) => keyword.trim());  
            // Delete empty words
            keywordsArray = keywordsArray.filter((keyword: string) => keyword !== '');
            request.body.keywords = keywordsArray;
            } else {
              request.body.keywords = null;
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
           if (!business) {
              const error = new Error('Business not found.');
              (error as any).statusCode = 404; 
              throw error;
           }
          await this.businessRepository.remove(business);
     
   }

  async parseBusiness(request: Request, response: Response, next: NextFunction) {
    try {
      const hotelId = await this.saveHotelFromJson(jsonData.hotel);
      // Execute saveHotelAmenitieslFromJson and saveBusinessesFromJson concurrently
      await Promise.all([
        await this.saveHotelAmenitieslFromJson(jsonData.hotel.amenities, hotelId),
        await this.saveBusinessesFromJson(jsonData, hotelId),
      ]);
      return { message: 'Businesses saved successfully.' };
     } catch (error) {
      throw Error('Failed to save businesses: ' + error.message);
     }
  }

  async saveHotelFromJson(hotelData: any): Promise<number> {
  
      const hotel = Object.assign(new Hotel(), {
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
    const savedHotel = await this.hotelRepository.save(hotel);
    return savedHotel.id;
}

async saveHotelAmenitieslFromJson(amenitiesData: any, hotelId: number): Promise<void> {
  
    for (const amenityType in amenitiesData) {
      if (amenitiesData.hasOwnProperty(amenityType)) {
          const amenity = amenitiesData[amenityType];
          const amenityData = this.hotelAmenitiesRepository.create({
              amenity_type: amenityType,
              available: amenity.available,
              hours: amenity.hours,
              hotelId: hotelId
          });
          await this.hotelAmenitiesRepository.save(amenityData);
      }
  }

}

    async saveBusinessesFromJson(data: any, hotelId: number) {
        const businessesData = [
            ...data.restaurants.map((b: any) => ({ ...b, categoryId: 1 })),
            ...data.drinks.map((b: any) => ({ ...b, categoryId: 2 })),
            ...data.activities.map((b: any) => ({ ...b, categoryId: 3 })),
            ...data.other.map((b: any) => ({ ...b, categoryId: 4 })),
        ];

        for (const businessData of businessesData) {
            const category = await this.categoryRepository.findOne({ where: { id: businessData.categoryId },});
            if (!category) {
                const error = new Error(`Category with id ${businessData.categoryId} not found.`);
                (error as any).statusCode = 404; 
                throw error;
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
