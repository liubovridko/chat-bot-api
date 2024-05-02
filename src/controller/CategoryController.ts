import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";
import { QueryParams } from "./BusinessController";

export class CategoryController {

    private categoryRepository = AppDataSource.getRepository(Category)

    async all(request: Request, response: Response, next: NextFunction) {
       
        return this.categoryRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
       
        return this.categoryRepository.findOneBy({id: Number(request.params.id)});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name} = request.body;

        const category = Object.assign(new Category(), {
            name,
        })

        return this.categoryRepository.save(category)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
      
        const categoryToRemove = await this.categoryRepository.findOneBy({id: Number(request.params.id)});
        if (!categoryToRemove) throw Error('category does not exist');
    

        await this.categoryRepository.remove(categoryToRemove);
        return "category has been removed"
    }

}