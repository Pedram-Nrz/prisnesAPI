import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PassportJWTService extends PassportStrategy(Strategy){

    constructor(private readonly usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'secret'
        })
    }

    async validate(payload: {useridentifier:number}){

        const targetUser = await this.usersService.findById(payload.useridentifier);

        if(!targetUser){
            throw new UnauthorizedException();
        }

        return {userid:targetUser.id, email:targetUser.email};

    }



}