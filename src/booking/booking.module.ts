import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { BookingEntity } from './entities/booking.entity';
import { AvailabilityEntity } from 'src/admin/entities/availability.entity';
import { AdminService } from 'src/admin/admin.service';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { PasswordUtilsService } from 'src/utils/password-utils.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, AdminService, TokenUtilsService, PasswordUtilsService],
  imports: [TypeOrmModule.forFeature([UserEntity, BookingEntity, AvailabilityEntity])]
})
export class BookingModule { }
