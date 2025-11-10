import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { TokenUtilsService } from './utils/token-utils.service';
import { MailUtilsService } from './utils/mail-utils.service';
import { PasswordUtilsService } from './utils/password-utils.service';
import { AxiosUtilsService } from './utils/axios-utils.service';
import { FlutterwaveUtilsService } from './utils/flutterwave-utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entities/user.entity';
import { BookingEntity } from './booking/entities/booking.entity';
import { AvailabilityEntity } from './admin/entities/availability.entity';
import { PaymentgatewayUtilsService } from './utils/paymentgateway.utils.service';
import { TransactionModule } from './transaction/transaction.module';



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,           // Makes ConfigService available throughout the app
            envFilePath: ['.env']     // Load environment variables from .env file
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            synchronize: false,                   // Disable auto-sync (use migrations instead)
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [UserEntity, BookingEntity, AvailabilityEntity],            // Registered entities
            autoLoadEntities: true                // Automatically load entities from feature modules
        }),
        TypeOrmModule.forFeature([]),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,                    // Use TLS
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                },
                debug: true,                      // Enable debug logging
                logger: true
            },
            defaults: {
                // Default sender address for all emails
                from: `"Booking System" <${process.env.MAIL_USER}>`
            },
            template: {
                // Email template configuration with Handlebars
                dir: join(__dirname, '..', 'src', 'mails'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true                  // Strict template compilation
                }
            }

        }),
        UserModule,
        BookingModule,
        AdminModule,
        AuthModule,
        TransactionModule
    ],
    providers: [
        TokenUtilsService,           // JWT token generation and verification
        MailUtilsService,            // Email sending functionality
        PasswordUtilsService,        // Password hashing and comparison
        AxiosUtilsService,           // HTTP client utilities
        FlutterwaveUtilsService, PaymentgatewayUtilsService      // Payment gateway integration
    ],
})
export class AppModule { }
