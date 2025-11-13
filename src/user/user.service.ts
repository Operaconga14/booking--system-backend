import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepo: Repository<UserEntity>

  async getProfile(req: any) {
    return "profiel "
  }
}
