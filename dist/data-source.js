"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var SearchQuery_1 = require("./entity/SearchQuery");
var Business_1 = require("./entity/Business");
var Category_1 = require("./entity/Category");
var Hotel_1 = require("./entity/Hotel");
var port = Number(process.env.POSTGRES_PORT);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: port,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User_1.User, Hotel_1.Hotel, Category_1.Category, Business_1.Business, SearchQuery_1.SearchQuery],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    migrationsTableName: "migration_table",
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
    },
});
var ExsampleDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: ["src/**/**.entity{.ts,.js}"],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    migrationsTableName: "migration_table",
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map