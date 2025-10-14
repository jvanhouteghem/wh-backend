import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Survey } from '@prisma/client';
import { SurveyDto } from './survey.dto';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SurveyCreateInput): Promise<Survey> {
    return this.prisma.survey.create({ data });
  }

  async findAll(): Promise<SurveyDto[]> {
    return this.prisma.survey.findMany();
  }
}
