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
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const data_source_1 = require("./data-source");
const Routes_1 = require("./routes/Routes");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({ message: err.message });
}
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: '*' }));
    //  only log error responses
    app.use((0, morgan_1.default)('combined', {
        skip: function (req, res) { return res.statusCode < 400; }
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.static(__dirname + '/public'));
    const uploadsPath = path_1.default.resolve(__dirname, '..', 'uploads');
    //if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);
    const imagesPath = path_1.default.join(uploadsPath, 'images');
    if (!fs_1.default.existsSync(imagesPath)) {
        fs_1.default.mkdirSync(imagesPath, { recursive: true });
    }
    app.use("/uploads", express_1.default.static(uploadsPath));
    app.use("/uploads/images", express_1.default.static(path_1.default.join(uploadsPath, 'images')));
    // register express routes from defined application routes
    Routes_1.Routes.forEach(route => {
        const middlewareArray = [];
        // If middleware is specified for the route, add it to the array
        if (route.middleware) {
            middlewareArray.push(route.middleware);
        }
        // Add a request handler to the array
        middlewareArray.push((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            // use for debug
            //     console.log(`Request received: ${req.method} ${req.url}`);
            //   next();
            try {
                const result = yield (new route.controller)[route.action](req, res, next);
                if (!res.headersSent) {
                    res.json(result);
                }
            }
            catch (error) {
                next(error);
            }
        }));
        // Registering a route with middleware
        app[route.method](route.route, ...middlewareArray);
    });
    app.use(handleError);
    // start express server
    const port = process.env.PORT || 4002;
    app.listen(port);
    console.log(`Express server has started on port: ${port}. Open http://localhost:${port}/`);
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map