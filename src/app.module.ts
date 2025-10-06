import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SurveyModule } from './survey/survey.module';
import {RequestIdMiddleware} from "./middlewares/request-logger.middleware";

@Module({
    imports: [PrismaModule, SurveyModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestIdMiddleware).forRoutes('*');
    }
}
