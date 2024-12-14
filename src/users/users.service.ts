import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({data:createUserDto});
  }

  async findById(id:number){
    return await this.prisma.user.findUnique({where:{id}});
  }

   
}
