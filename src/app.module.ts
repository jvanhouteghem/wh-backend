import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SurveyModule } from './survey/survey.module';
import { RequestIdMiddleware } from './middlewares/request-logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60000,
          limit: 50000,
        },
      ],
    }),
    SurveyModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
