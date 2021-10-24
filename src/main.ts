import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptions = {
  origin: ['http://localhost:4200'],
  optionSuccessStatus : 200
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
