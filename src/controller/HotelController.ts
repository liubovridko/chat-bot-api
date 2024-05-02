import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Hotel } from "../entity/Hotel";
import { QueryParams } from "./BusinessController";

export class HotelController {

    private hotelRepository = AppDataSource.getRepository(Hotel)

    async all(request: Request, response: Response, next: NextFunction) {
       
        return this.hotelRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const queryParams: QueryParams = request.query;
        const { keyBot = "chatbot1" } = queryParams;
        return this.hotelRepository.findOne({ where: { chatBot_key: keyBot } });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, url, description, chatBot_key } = request.body;

        const hotel = Object.assign(new Hotel(), {
            title,
            url,
            description,
            chatBot_key
        })

        return this.hotelRepository.save(hotel)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        //const id = parseInt(request.params.id)

        const hotelToRemove = await this.hotelRepository.findOneBy({id:parseInt(request.params.id) });
        if (!hotelToRemove) throw Error('user does not exist');

        await this.hotelRepository.remove(hotelToRemove);
        return "user has been removed"
    }

}