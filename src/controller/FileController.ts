
import { Request, Response, NextFunction } from 'express';


export class fileController {

   async uploadImage (req: Request , res: Response, next: NextFunction) {

    if (!req.file) {
        const error = new Error('No file uploaded.');
        (error as any).statusCode = 400; 
        throw error;
    }

    return  {
          url: `/uploads/images/${req.file.filename}`,
      }; 

   }
}




