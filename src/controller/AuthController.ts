import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User, UserRole } from "../entity/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middleware/authenticateToken';

interface LoginRequestBody {
    email: string;
    password: string;
  }

export class AuthController {

    private userRepository = AppDataSource.getRepository(User)

    async register(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password } = request.body;

        // check exist email
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            const error = new Error('Email already exists');
            (error as any).statusCode = 400; 
            throw error;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        return { message: 'User was created', user };
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password }: LoginRequestBody = request.body;
        // find user by email
        const user = await this.userRepository.findOne({ where: { email } });
   
        if (!user) {
            const error = new Error('User not found, email does not exist');
            (error as any).statusCode = 400; 
            throw error;
        }
        // check password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            (error as any).statusCode = 400; 
            throw error;
        }
        if (user.role !== UserRole.ADMIN) {
            const error = new Error('Denied, requires admin rights');
            (error as any).statusCode = 403; 
            throw error;
          }

        // create JWT token
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || 'default_secret', {
            expiresIn: process.env.TOKEN_EXPIRES,
        });


        return response.json({ user, token });
    }


    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async authMe(request: AuthenticatedRequest, response: Response, next: NextFunction) {
        const id = parseInt(request.userId)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) throw Error('User not found');

      
		return user;
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