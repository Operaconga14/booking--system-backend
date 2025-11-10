import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule, AuthModule, BookingModule, TransactionModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
