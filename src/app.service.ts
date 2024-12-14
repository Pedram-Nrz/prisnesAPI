import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'PrisNes Invoicing API. Please, check the /api route for the Swagger';
  }
}
