import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { create } from 'domain';
import { hash } from 'bcrypt';
import { UserEntity } from './interfaces/user.entity';



@Controller('user')
export class UserController {
    user: UserEntity[] = [];

    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUser: createUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUsers();
    }

}
