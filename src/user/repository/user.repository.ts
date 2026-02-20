import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../interfaces/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.repository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    return this.repository.find({
      where: { email },
    });
  }
}