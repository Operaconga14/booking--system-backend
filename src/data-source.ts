import { DataSource } from "typeorm";

/**
 * TypeORM DataSource configuration for database migrations
 * This is separate from the application configuration and is used by TypeORM CLI
 * to generate and run migrations
 */
export const AppDatasource = new DataSource({
    type: 'postgres',                                     // Database type
    host: process.env.DB_HOST,                            // Database host
    port: Number(process.env.DB_PORT),                    // Database port
    username: String(process.env.DB_USERNAME),            // Database username
    password: process.env.DB_PASSWORD,                    // Database password
    database: process.env.DB_NAME,                        // Database name
    entities: [],                            // Entity classes for schema generation
    migrations: ["src/migrations/*.{ts,js}"],            // Migration files location
    synchronize: false,                                   // Never auto-sync in production
});