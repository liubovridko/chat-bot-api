import multer,  { FileFilterCallback,}  from 'multer';
import path from 'path';
import { Request } from 'express';
import multerS3 from 'multer-s3';
import s3 from '../s3Client';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const isLocal = process.env.NODE_ENV === 'local';

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME!,
  metadata: function (req: Request, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req: Request, file: Express.MulterS3.File, cb: (error: any, key?: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, `static/uploads/${filename}`);
  }
})

const localDiskstorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    cb(null, '../uploads/images'); 
  },
  filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, filename); 
  },
});


const multerFilter = (
  req: Request,
  file: Express.Multer.File & Express.MulterS3.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."));
  }
};

const multerOptions = {
  storage: isLocal ? localDiskstorage : s3Storage,
  fileFilter: multerFilter
}

 export const upload = multer(multerOptions).single('image');