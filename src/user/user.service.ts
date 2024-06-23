import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const isAlreadyRegistred = await this.prisma.user.findUnique({
      where: {email: data.email}
    });

    if (isAlreadyRegistred) {
      throw new ConflictException("Email already in use")
    }

    const createdUser = await this.prisma.user.create({ data });
    
    return {
      ...createdUser,
      password: undefined
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return {
      ...user,
      password: undefined
    }
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany()

    return allUsers
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({where: {id: id}});

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });


    return {
      ...updatedUser,
      password: undefined
    }
  }

  async remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  
  async changePassword(updatePasswordDto: UpdatePasswordDto) {
    throw new Error('Method not implemented.');
  }

  async findUser(data: string) {
    let user

    if (data.includes('@')) {
      user = await this.prisma.user.findUnique({
        where: { email: data }
      });
    }


    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { username: data }
      });
    }

    return user;
  }
}
