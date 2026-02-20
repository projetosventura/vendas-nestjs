import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { createUserDto } from './dtos/create-user.dto';
import { UserEntity } from './interfaces/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { read } from 'fs';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

 private users: UserEntity[] = [];

  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    console.log('Body recebido', createUserDto);
    const saltOrRounds = 10;

    const passwordHashed = await hash(
      createUserDto.password,
      
      saltOrRounds,
    );

    return this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
      type_user: 1
    });

  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
