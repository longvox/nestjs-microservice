import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { CRUDUserDto } from './dto/crud-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(crudUserDto: CRUDUserDto): Promise<User> {
    const { name, phone, email } = crudUserDto;

    const user = this.create();
    user.name = name;
    user.phone = phone;
    user.email = email;

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
