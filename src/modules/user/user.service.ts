import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return {
        success: true,
        user: await this.userRepository.save(user)
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) throw new Error('User not found');

      await this.userRepository.update(id, updateUserDto);

      return {
        success: true,
        user: await this.userRepository.findOneBy({ id })
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) throw new Error('User not found');

      await this.userRepository.delete(id);

      return {
        success: true,
        user: 'User removed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({email});
  }
}
