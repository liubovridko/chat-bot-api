import  express from "express";
import swaggerUi from "swagger-ui-express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import  morgan from "morgan";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/Routes";
import  cors from "cors";
import path from "path";
import fs from 'fs';                                                                                 
import swaggerSpec from './config/swaggerOptions.js';
 




function handleError(err, req, res, next) {
  res.status(err.statusCode || 500).send({message: err.message});
}



AppDataSource.initialize().then(async () => {

 
    // create express app
    const app = express();

    // Add a specific controller along the /docs route (documentation will be displayed at http://localhost:5000/api-docs/)
    if (process.env.NODE_ENV === 'development') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
      }
    //app.use(cors({ origin: '*' }));
    app.use(cors({ origin: 'http://localhost:3000' }));
    //  only log error responses
    app.use(morgan('combined', {
        skip: function (req, res) { return res.statusCode < 400 }
    }))



    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  
    // app.use(express.static(__dirname + '/public'));
    const uploadsPath = path.resolve(__dirname, '..', 'uploads');
    
    
    //if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);

    const imagesPath = path.resolve(uploadsPath, 'images');
   

    if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
    }
    
    app.use("/uploads", express.static(uploadsPath));
    app.use("/uploads/images", express.static(imagesPath));

    // register express routes from defined application routes
    Routes.forEach(route => {
        const middlewareArray = [];

        // If middleware is specified for the route, add it to the array
        if (route.middleware) {
            middlewareArray.push(route.middleware);
        }

        // Add a request handler to the array
        middlewareArray.push(async (req: Request, res: Response, next: Function) => {
            // use for debug
            //   console.log(`Request received: ${req.method} ${req.url}`);
            //   next();
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                if (!res.headersSent) {
                    res.json(result);
                }
            } catch (error) {
                next(error);
            }
        });

        // Registering a route with middleware
        (app as any)[route.method](route.route, ...middlewareArray);
    });

    app.use(handleError);

    // start express server
    const port = process.env.PORT || 4002;
    app.listen(port);


    console.log(`Express server has started on port: ${port}. Open http://localhost:${port}/`)

}).catch(error => console.log(error))
