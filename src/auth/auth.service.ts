import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}

    async login(email: string, password: string): Promise<AuthEntity>{

        const targetUser = await this.prisma.user.findUnique({where:{email}});

        if(!targetUser){
            throw new NotFoundException(`The email or password are incorrect`);
        }

        //No Encryption is done on the password - This is just a test api :D
        if(targetUser.password !== password){
            throw new NotFoundException(`The email or password are incorrect`);
        }

        return {
            accessToken: this.jwtService.sign({useridentifier: targetUser.id})
        }

    }

}
