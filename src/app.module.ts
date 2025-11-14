import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { PasswordUtilsService } from './utils/password.utils.service';
import { TokenUtilsService } from './utils/token.utils.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        synchronize: false,
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [UserEntity],
        autoLoadEntities: true,
        ssl: { rejectUnauthorized: false },
        extra: {
          max: 1
        }
      })
    }),
    AuthModule,
    UserModule,
    AdminModule
  ],
  controllers: [],
  providers: [PasswordUtilsService, TokenUtilsService],
})
export class AppModule { }
