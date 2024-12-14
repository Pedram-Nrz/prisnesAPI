import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma-exception/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted:true
  }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))


  const config = new DocumentBuilder()
                    .setTitle("PrisNes Invoicing API")
                    .setDescription("Simple Invocing API")
                    .addBearerAuth()              
                    .setVersion("0.1")
                    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document);    
  
  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
