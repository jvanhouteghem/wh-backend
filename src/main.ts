import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // enable global validation
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,            // remove properties that are not defined in the DTO
        forbidNonWhitelisted: false,// do not throw an error for unknown properties
        transform: true,            // transform the JSON body into a DTO instance
    }));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
