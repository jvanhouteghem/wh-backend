import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow local GET requests
  app.enableCors({
    origin: true, // reflect request origin (useful for local dev)
    methods: ['GET', 'DELETE', 'UPDATE', 'POST', 'HEAD', 'OPTIONS'],
    credentials: false,
  });

  // enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that are not defined in the DTO
      forbidNonWhitelisted: false, // do not throw an error for unknown properties
      transform: true, // transform the JSON body into a DTO instance
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
