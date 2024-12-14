import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportJWTService } from './passportjwt.service';
import { ProductsModule } from 'src/products/products.module';
import { InvoicesModule } from 'src/invoices/invoices.module';



@Module({
  imports:[
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET || 'secret',
      signOptions:{
        expiresIn: "60m"
      }
    }),
    UsersModule,
    ProductsModule,
    InvoicesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PassportJWTService],
})
export class AuthModule {}
