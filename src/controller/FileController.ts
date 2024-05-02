
import { Request, Response, NextFunction } from 'express';


export class fileController {

   async uploadImage (req: Request , res: Response, next: NextFunction) {

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    return  res.json({
          url: `/uploads/images/${req.file.filename}`,
      });
      

}
}




