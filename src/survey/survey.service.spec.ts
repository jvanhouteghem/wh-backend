import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { PrismaService } from '../prisma/prisma.service';
import { Survey } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import {SurveyDto} from "./survey.dto";

describe('SurveyService', () => {
    let service: SurveyService;
    let prisma: DeepMockProxy<PrismaService>;

    beforeEach(async () => {
        prisma = mockDeep<PrismaService>();

        prisma.survey.findMany.mockResolvedValue([{ rating: 5, comment: 'ok' }] as Survey[]);
        prisma.survey.create.mockResolvedValue({ rating: 5, comment: 'ok' } as Survey);

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SurveyService,
                { provide: PrismaService, useValue: prisma },
            ],
        }).compile();

        service = module.get<SurveyService>(SurveyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a survey', async () => {
        const dto: SurveyDto = { rating: 5, comment: 'ok' };
        const result = await service.create(dto);
        expect(result.comment).toBe('ok');
        expect(prisma.survey.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should return all surveys', async () => {
        const surveys: SurveyDto[] = await service.findAll();
        expect(surveys.length).toBe(1);
        expect(surveys[0].rating).toBe(5);
    });
});
