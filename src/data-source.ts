import 'dotenv/config';
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"
import { SearchQuery } from "./entity/SearchQuery"
import { Business } from "./entity/Business"
import { Category } from "./entity/Category"
import { Hotel } from "./entity/Hotel"
import { SeederOptions } from 'typeorm-extension'

const port = Number(process.env.POSTGRES_PORT);

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: port,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Hotel, Category, Business, SearchQuery],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    migrationsTableName: "migration_table",
    subscribers: [],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    // ssl: {
    //      rejectUnauthorized: false,
    // },
}

export const AppDataSource  = new DataSource(options)

 const ExsampleDataSource = new DataSource({
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
})
