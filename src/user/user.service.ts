import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { createUserDto } from './dtos/create-user.dto';
import { UserEntity } from './interfaces/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    const passwordHashed = await hash(
      createUserDto.password,
      10,
    );

    return this.userRepository.create({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    return this.userRepository.findByEmail(email);
  }
}
