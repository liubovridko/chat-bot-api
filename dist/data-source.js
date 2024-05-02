"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const SearchQuery_1 = require("./entity/SearchQuery");
const Business_1 = require("./entity/Business");
const Category_1 = require("./entity/Category");
const Hotel_1 = require("./entity/Hotel");
const port = Number(process.env.POSTGRES_PORT);
const options = {
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
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    // ssl: {
    //      rejectUnauthorized: false,
    // },
};
exports.AppDataSource = new typeorm_1.DataSource(options);
const ExsampleDataSource = new typeorm_1.DataSource({
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