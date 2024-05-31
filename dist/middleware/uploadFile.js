"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3Client_1 = __importDefault(require("../s3Client"));
const isLocal = process.env.NODE_ENV === 'local';
const s3Storage = (0, multer_s3_1.default)({
    s3: s3Client_1.default,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path_1.default.extname(file.originalname);
        cb(null, `static/uploads/${filename}`);
    }
});
const localDiskstorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path_1.default.extname(file.originalname);
        cb(null, filename);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new Error("Not an image! Please upload only images."));
    }
};
const multerOptions = {
    storage: isLocal ? localDiskstorage : s3Storage,
    fileFilter: multerFilter
};
exports.upload = (0, multer_1.default)(multerOptions).single('image');
//# sourceMappingURL=uploadFile.js.map