import path from 'path';
import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';


export class fileController {

   async uploadImage (req: Request , res: Response, next: NextFunction) {

    if (!req.file) {
        const error = new Error('No file uploaded.');
        (error as any).statusCode = 400; 
        throw error;
    }

    const imagePath = req.body.oldImagePath;
    // Delete old images
    if (imagePath) {
      let fileName = path.basename(imagePath);
      let filePath = path.join(process.cwd(), process.env.IMG_PATH, fileName);
      //let filePath = path.resolve( process.env.IMG_PATH, fileName);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log('Old image deleted successfully:', filePath);
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        } else {
          console.warn('Old image not found:', filePath);
        }
      } else {
        console.warn('No old image path provided.');
      }
  

    return  {
          url: `/uploads/images/${req.file.filename}`,
      }; 

   }
}




