import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source"
import { Business } from "../entity/Business";
import { SearchQuery } from "../entity/SearchQuery";
import { Hotel } from "../entity/Hotel";
import { QueryParams } from "./BusinessController";


interface IQueryParams {
  startDate: string;
  endDate: string;
}


export class SearchController {

  private businessRepository = AppDataSource.getRepository(Business);
  private searchQueryRepository = AppDataSource.getRepository(SearchQuery);
  private hotelRepository = AppDataSource.getRepository(Hotel);

  async getAll(request: Request, response: Response, next: NextFunction) {
    
    const searchQueries = await this.searchQueryRepository
    .createQueryBuilder('searchQuery')
    .leftJoinAndSelect('searchQuery.hotel', 'hotel') 
    .orderBy('searchQuery.createdAt', 'DESC') 
    .getMany();
    return searchQueries;
  }

  async searchKeywordsInObjects(words: string[], objects: any[]): Promise<any[]> {
   let filteredObjects: any[] = [];
      
   objects.forEach(object => {
     if (object.keywords) {
       object.keywords.forEach((keyword: string) => {
         const keywordWords = keyword.split(" ");
         const allWordsMatch = keywordWords.every(word => words.includes(word));
 
         if (allWordsMatch) {
           filteredObjects.push(object);
         }
       });
     }
   });
 
   const uniqueFilteredObjects = Array.from(new Set(filteredObjects.map(obj => obj.id)))
   .map(id => {
    
    if (typeof id === 'number' || !isNaN(Number(id))) {
       return filteredObjects.find(obj => obj.id === id);
     }
     return null;
   })
   .filter(obj => obj !== null);
   // console.log("uniqueFilteredObjects:", uniqueFilteredObjects);
   return uniqueFilteredObjects;
  }

  async searchByKeywords(request: Request, response: Response, next: NextFunction) {
    const queryParams: QueryParams = request.query;
    const { message, keyBot = "chatbot1" } = queryParams;

    try {
      const hotel = await this.hotelRepository.findOne({ where: { chatBot_key: keyBot } });
      if (!hotel) throw Error("Hotel not found");

      const searchQuery = this.searchQueryRepository.create({
        text: message,
        hotel: hotel
      });
      await this.searchQueryRepository.save(searchQuery);
      const filteredObjects = await this.businessRepository
      .createQueryBuilder("business")
      .where("business.hotelId = :hotelId", { hotelId: hotel.id })
      .getMany();

      // search business
      // const filteredObjects = await this.businessRepository
      //   .createQueryBuilder("business")
      //   .where("business.hotelId = :hotelId", { hotelId: hotel.id })
      //   .andWhere((qb) => {
      //     const words = message.toLowerCase().split(/\s+/);
      //     const keywordConditions = words.map((word, index) => {
      //       const paramName = `word${index}`;
      //       qb.setParameter(paramName, `%${word}%`);
      //       return `business.keywords::text ILIKE :word${index}`;
      //     });
          
      //     return qb.select("business")
      //              .where(`(${keywordConditions.join(" OR ")})`);
      //   })
      //   .getMany();

      const result = await this.searchKeywordsInObjects(message.toLowerCase().split(/\s+/), filteredObjects);
      
      return result;

    } catch (error) {
      next({ statusCode: 500, message: error.message });
    }
  }

  public async getSearchQueryStatistic(request:  Request<any, any, any, IQueryParams>, response: Response, next: NextFunction) {
    const resultData: any[] = [];
    const startDate = new Date(request.query.startDate);
    startDate.setHours(0, 0, 0, 0); 
    const endDate = new Date(request.query.endDate);
    endDate.setHours(23, 59, 59, 999); 


    const data = await this.searchQueryRepository
      .createQueryBuilder('searchQuery')
      .select([
        "to_char(searchQuery.createdAt, 'YYYY-MM-DD') as date",
        'COUNT(*) AS count', 
      ])
      .where('searchQuery.createdAt BETWEEN :dateStart AND :dateStop', {
        dateStart: startDate,
        dateStop: endDate,
      })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();
      
  
    data.forEach((elem) => {
      resultData.push({ date: elem.date, count: Number(elem.count) });
    });
  
    if (!resultData.length) {
      const error = new Error('There is no data for the selected period');
      (error as any).statusCode = 404; 
      throw error;
    }
  
    return resultData;
  }
}
