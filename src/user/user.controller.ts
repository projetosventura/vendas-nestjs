import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { Param } from '@nestjs/common';
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

    @Get(':email')
    async getUserByEmail(@Param('email') email: string): Promise<UserEntity []> {
        return this.userService.findByEmail(email);
    }

}
