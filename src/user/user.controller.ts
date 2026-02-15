import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { create } from 'domain';
import { hash } from 'bcrypt';
import { User } from './interfaces/user.interface';



@Controller('user')
export class UserController {
    user: User[] = [];

    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUser: createUserDto): Promise<User> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

}
