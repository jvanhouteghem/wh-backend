import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDto } from './survey.dto';
import { AppLogger } from '../app.logger';

@Controller('survey')
export class SurveyController {
  private readonly logger = new AppLogger(SurveyController.name);

  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() body: SurveyDto) {
    this.logger.log(`Creating survey: ${JSON.stringify(body)}`);
    const result = await this.surveyService.create(body);
    this.logger.log(`Survey created successfully.`);
    return result;
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all surveys');
    return this.surveyService.findAll();
  }
}
