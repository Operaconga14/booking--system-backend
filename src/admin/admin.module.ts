import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PasswordUtilsService } from 'src/utils/password.utils.service';
import { TokenUtilsService } from 'src/utils/token.utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PasswordUtilsService, TokenUtilsService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class AdminModule { }
