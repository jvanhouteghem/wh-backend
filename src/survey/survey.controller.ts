import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    create(@Body() body: { rating: number; comment?: string }) {
        return this.surveyService.create(body);
    }

    @Get()
    findAll() {
        return this.surveyService.findAll();
    }
}
