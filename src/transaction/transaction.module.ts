import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PaymentgatewayUtilsService } from 'src/utils/paymentgateway.utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { BookingEntity } from 'src/booking/entities/booking.entity';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PaymentgatewayUtilsService, TokenUtilsService],
  imports: [TypeOrmModule.forFeature([UserEntity, BookingEntity])]
})
export class TransactionModule { }
