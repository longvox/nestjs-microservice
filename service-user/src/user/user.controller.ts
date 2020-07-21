import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import {CRUDUserDto} from './dto/crud-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';

@Controller('tasks')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @Get('/')
  @MessagePattern({cmd: "getUser"})
  getUser(): Promise<User[]> {
    const users = this.userService.getUser();
    of(users);
    return users;
  }

  @Get('/:email')
  @MessagePattern({cmd: "getUserByEmail"})
  getUserById(
    @Param('email') email: string,
  ): Promise<User> {
    const user = this.userService.getUserByEmail(email); 
    of(user);
    return user;
  }

  @Post()
  @MessagePattern({cmd: "createUser"})
  createUser(
    @Body() createUserDto: CRUDUserDto
  ): Promise<User> {
    this.logger.verbose(`User "${createUserDto.email}" creating a new task. Data: ${JSON.stringify(createUserDto)}`);
    const user = this.userService.createUser(createUserDto);
    of(user);
    return user;
  }

  @Delete('/:email')
  deleteUser(
    @Param('email') email: string
  ): Promise<void> {
    return this.userService.deleteUser(email);
  }

  @Patch('/')
  updateTaskStatus(
    @Body() updateUser: CRUDUserDto
  ): Promise<User> {
    const user = this.userService.updateUser(updateUser);
    return user;
  }
}
