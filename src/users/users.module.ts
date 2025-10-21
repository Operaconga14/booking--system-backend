import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailUtilsService } from 'src/utils/mail-utils.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, TokenUtilsService, MailUtilsService],
})
export class UsersModule { }
