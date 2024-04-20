import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Hotel } from "../entity/Hotel"

export class HotelController {

    private userRepository = AppDataSource.getRepository(Hotel)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, url, description, chatBot_key } = request.body;

        const hotel = Object.assign(new Hotel(), {
            title,
            url,
            description,
            chatBot_key
        })

        return this.userRepository.save(hotel)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        //const id = parseInt(request.params.id)

        const hotelToRemove = await this.userRepository.findOneBy({id:parseInt(request.params.id) });
        if (!hotelToRemove) throw Error('user does not exist');
        // if (!userToRemove) {
        //     return "this user not exist"
        // }

        await this.userRepository.remove(hotelToRemove);

        //return "user has been removed"
    }

}