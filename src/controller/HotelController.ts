import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Hotel } from "../entity/Hotel";
import { QueryParams } from "./BusinessController";

export class HotelController {

    private hotelRepository = AppDataSource.getRepository(Hotel)

    async all(request: Request, response: Response, next: NextFunction) {
       
        return this.hotelRepository.find({order:{id: 'ASC'}});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const queryParams: QueryParams = request.params;
        const { keyBot } = queryParams;
     
        return this.hotelRepository.findOne({ where: { chatBot_key: keyBot }, relations:['amenities'] });
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { title, url, wifi_name, wifi_password, front_desk_number, check_in_time, check_out_time, chatBot_key } = request.body;

        const hotel = Object.assign(new Hotel(), {
            title,
            url,
            wifi_name,
            wifi_password,
            front_desk_number,
            check_in_time,
            check_out_time,
            chatBot_key
        })

        return this.hotelRepository.save(hotel)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const hotel = await this.hotelRepository.findOneBy({
              id: Number(request.params.id), 
            });
        
            if (!hotel) {
                const error = new Error('Hotel not found.');
                (error as any).statusCode = 404; 
                throw error;
            }
    
              this.hotelRepository.merge(hotel, request.body);
              await this.hotelRepository.save(hotel);
              //return { message: 'Business updated successfully.' };
              return hotel;
          
          } catch (error) {
            console.error('Error updating business:', error);
            throw Error('Failed to update business: ' + error.message);
          }  
       }

    async remove(request: Request, response: Response, next: NextFunction) {

        const hotelToRemove = await this.hotelRepository.findOneBy({id:parseInt(request.params.id) });
        if (!hotelToRemove) {
            const error = new Error('Hotel not found');
            (error as any).statusCode = 404; 
            throw error;
        } 

        await this.hotelRepository.remove(hotelToRemove);
        return "Hotel has been removed"
    }

}