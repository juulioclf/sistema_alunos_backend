import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });
    
    return {
      ...createdUser,
      password: undefined
    };
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
