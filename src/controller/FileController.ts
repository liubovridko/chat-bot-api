
import { Request, Response, NextFunction } from 'express';

const imgPath = process.env.IMG_PATH;
export class fileController {

   async uploadImage (req: Request , res: Response, next: NextFunction) {

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    return  res.json({
          url: `${imgPath}/${req.file.filename}`,
      });
      
}
}




