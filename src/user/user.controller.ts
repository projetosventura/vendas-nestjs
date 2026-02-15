import { Controller, Post, Body} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';

import { create } from 'domain';



@Controller('user')
export class UserController {

    @Post()
    async createUser(@Body() createUser: createUserDto)  {
       
        return {
             ...createUser,
            password: '********'
        }
           
    }
}

