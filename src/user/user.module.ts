import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TokenUtilsService } from 'src/utils/token.utils.service';

@Module({
  controllers: [UserController],
  providers: [UserService, TokenUtilsService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule { }
