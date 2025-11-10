import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { PasswordUtilsService } from 'src/utils/password-utils.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard, RoleGuard, TokenUtilsService, PasswordUtilsService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule { }
