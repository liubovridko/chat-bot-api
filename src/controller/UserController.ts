import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) throw Error('unregistered user');

        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password
        })
        await this.userRepository.save(user)

        return {message:"User was created"}
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        //const id = parseInt(request.params.id)

        const userToRemove = await this.userRepository.findOneBy({id: Number(request.params.id)});
        if (!userToRemove) throw Error('user does not exist');
        // if (!userToRemove) {
        //     return "this user not exist"
        // }

        await this.userRepository.remove(userToRemove);

        return  {message:"user has been removed"}
    }

}