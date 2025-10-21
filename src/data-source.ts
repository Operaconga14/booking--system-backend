import { DataSource } from "typeorm";
import { User } from "./users/entities/user.entity";
import { Booking } from "./bookings/entities/booking.entity";

export const AppDatasource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Booking],
    migrations: ["src/migrations/*.{ts,js}"],
    synchronize: false,
});