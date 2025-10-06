import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SurveyModule } from './survey/survey.module';

@Module({
    imports: [PrismaModule, SurveyModule],
})
export class AppModule {}
