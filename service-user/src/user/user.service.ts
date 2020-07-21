import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CRUDUserDto } from './dto/crud-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository.find(); 
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository.getUserByEmail(email);

    if (!found) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return found;
  }

  async createUser(createTaskDto: CRUDUserDto): Promise<User> {
    return this.userRepository.createUser(createTaskDto);
  }

  async deleteUser(email: string): Promise<void> {
    const result = await this.userRepository.delete({ email });

    if (result.affected === 0) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
  }

  async updateUser(user: CRUDUserDto): Promise<User> {
    const found_user = await this.userRepository.getUserByEmail(user.email);
    
    if (!found_user) {
      throw new NotFoundException(`User with email "${user.email}" not found`);  
    } else {
      found_user.name = user.name || found_user.name
      found_user.phone = user.phone || found_user.phone
    }

    return found_user;    
  }
}
