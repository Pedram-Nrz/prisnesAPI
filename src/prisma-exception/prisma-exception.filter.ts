import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // console.error(exception.message);  

    const httpContext = host.switchToHttp();
    const res = httpContext.getResponse<Response>();
    const msg = exception.message.replace(/\n/g,'');

    switch(exception.code){

      case "P2025":{
        res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message:msg
        });

        break
      }

      case "P2002":{
        res.status(HttpStatus.CONFLICT).json({
          statuCode: HttpStatus.CONFLICT,
          message:msg
        });

        break;
      }

      default:{
          // default 500 error code
          super.catch(exception, host);
      }

    }



  }
}
