import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { MailUtilsService } from 'src/utils/mail-utils.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { Booking } from 'src/bookings/entities/booking.entity';

@Module({
    controllers: [AdminController],
    providers: [AdminService, TokenUtilsService, MailUtilsService, PasswordUtilsService],
    imports: [TypeOrmModule.forFeature([User, Booking])],
})
export class AdminModule { }
