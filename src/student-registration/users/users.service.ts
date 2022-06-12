import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    //inject user repository for use here in UsersService as if it is part of the class
    @InjectRepository(User)
    private usersRepository: Repository<User>
    ){}

  async create(createUserDto: CreateUserDto) {
    const newUser: User = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(newUser);
    //return 'This action adds a new user';
  }

  async findAll() {
    //return `This action returns all users`;
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    //return `This action returns a #${id} user`;
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //return `This action updates a #${id} user`;
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    //return `This action removes a #${id} user`;
    return await this.usersRepository.delete(id);
  }
}
