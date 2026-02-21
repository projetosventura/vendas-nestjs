import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { createUserDto } from './dtos/create-user.dto';
import { UserEntity } from './interfaces/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    try {
      const passwordHashed = await hash(
        createUserDto.password,
        10,
      );

      return await this.userRepository.create({
        ...createUserDto,
        password: passwordHashed,
      });
    } catch (error) {
      
      if (error.code === '23505') {
        throw new ConflictException('Email já cadastrado');
      }

      throw new InternalServerErrorException(
        'Erro ao criar usuário',
      );
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar usuários',
      );
    }
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao buscar usuário',
      );
    }
  }
}