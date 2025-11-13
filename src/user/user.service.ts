import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepo: Repository<UserEntity>

  async getProfile(req: any) {
    try {
      const user = await this.userRepo.findOne({ where: { id: req.user.id }, select: ['name', 'email', 'createdAt', 'updatedAt', 'deletedAt'] })

      if (!user)
        throw new NotFoundException("User not found")

      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
