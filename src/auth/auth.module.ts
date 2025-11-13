import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordUtilsService } from 'src/utils/password.utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordUtilsService],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class AuthModule { }
