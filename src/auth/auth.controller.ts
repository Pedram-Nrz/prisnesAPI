import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  @ApiResponse({type: AuthEntity})
  async login(@Body() login: LoginUserDto){
    return await this.authService.login(login.email, login.password);
  }

}
