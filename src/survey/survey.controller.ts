import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import {SurveyDto} from "./survey.dto";

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    create(@Body() body: SurveyDto) {
        return this.surveyService.create(body);
    }

    @Get()
    findAll(): Promise<SurveyDto[]> {
        return this.surveyService.findAll();
    }
}
