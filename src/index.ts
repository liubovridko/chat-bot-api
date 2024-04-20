import  express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import  morgan from "morgan";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/Routes";
import  cors from "cors";


function handleError(err, req, res, next) {
  res.status(err.statusCode || 500).send({message: err.message});
}

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors());
    //  only log error responses
    app.use(morgan('combined', {
        skip: function (req, res) { return res.statusCode < 400 }
    }))
    
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
            const result = await (new (route.controller as any))[route.action](req, res, next);
            res.json(result);
            } catch (error) {
                next(error);
            }
        });
    });

    app.use(handleError);

    // setup express app here
    // ...

    // start express server
    const port = process.env.API_PORT || 4002;
    app.listen(port);

    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Timber",
    //         lastName: "Saw",
    //         email:"admin@gmail.com",
    //         password: "1111"
    //     })
    // )

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Phantom",
    //         lastName: "Assassin",
    //         age: 24
    //     })
    // )

    // app.post('/fetch-business', async (req, res) => {
    //     try {
    //         const businessController = new BusinessController();
    //         await businessController.saveBusinessesFromJson(jsonData); 
    //         res.status(200).send({ message: 'Businesses saved successfully.' });
    //     } catch (error) {
    //         res.status(500).send({ message: 'Error saving businesses.', error: error.message });
    //     }
    // });

    console.log(`Express server has started on port: ${port}. Open http://localhost:${port}/`)

}).catch(error => console.log(error))
