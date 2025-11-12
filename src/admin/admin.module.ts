import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { AvailabilityEntity } from './entities/availability.entity';
import { BookingEntity } from 'src/booking/entities/booking.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PasswordUtilsService, TokenUtilsService],
  imports: [TypeOrmModule.forFeature([UserEntity, AvailabilityEntity, BookingEntity])]
})
export class AdminModule { }
