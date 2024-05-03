"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
class fileController {
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                const error = new Error('No file uploaded.');
                error.statusCode = 400;
                throw error;
            }
            const imagePath = req.body.oldImagePath;
            // const filePath = path.resolve(oldImagePath);
            // Delete old images
            if (imagePath) {
                let fileName = path_1.default.basename(imagePath);
                let filePath = path_1.default.join(process.cwd(), process.env.IMG_PATH, fileName);
                //let filePath = path.resolve( process.env.IMG_PATH, fileName);
                if (fs.existsSync(filePath)) {
                    try {
                        fs.unlinkSync(filePath);
                        console.log('Old image deleted successfully:', filePath);
                    }
                    catch (error) {
                        console.error('Error deleting old image:', error);
                        // Продолжаем выполнение функции, не выбрасывая ошибку
                    }
                }
                else {
                    console.warn('Old image not found:', filePath);
                }
            }
            else {
                console.warn('No old image path provided.');
            }
            return {
                url: `/uploads/images/${req.file.filename}`,
            };
        });
    }
}
exports.fileController = fileController;
//# sourceMappingURL=FileController.js.map