import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AdminModule } from './admin/admin.module';
import { TokenUtilsService } from './utils/token-utils.service';
import { MailUtilsService } from './utils/mail-utils.service';
import { PasswordUtilsService } from './utils/password-utils.service';
import { AxiosUtilsService } from './utils/axios-utils.service';
import { FlutterwaveUtilsService } from './utils/flutterwave-utils.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { Booking } from './bookings/entities/booking.entity';


@Module({
    imports: [
        UsersModule,
        BookingsModule,
        TransactionsModule,
        AdminModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env']
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            synchronize: false,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Booking],
            autoLoadEntities: true
        }),
        TypeOrmModule.forFeature([User]),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                },
                debug: true,
                logger: true
            },
            defaults: {
                from: `"Booking System" <${process.env.MAIL_USER}>`
            },
            template: {
                dir: join(__dirname, '..', 'src', 'mails'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }

        })
    ],
    providers: [TokenUtilsService, MailUtilsService, PasswordUtilsService, AxiosUtilsService, FlutterwaveUtilsService],
})
export class AppModule { }
