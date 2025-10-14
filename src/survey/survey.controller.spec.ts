import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { SurveyDto } from './survey.dto';

const mockSurveyService = {
  create: jest
    .fn()
    .mockImplementation((dto: SurveyDto) => Promise.resolve(dto)),
  findAll: jest.fn().mockResolvedValue([
    { rating: 5, comment: 'ok' },
    { rating: 3, comment: 'meh' },
  ]),
};

describe('SurveyController', () => {
  let controller: SurveyController;
  let service: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [{ provide: SurveyService, useValue: mockSurveyService }],
    }).compile();

    controller = module.get<SurveyController>(SurveyController);
    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create when creating a survey', async () => {
    const dto: SurveyDto = { rating: 5, comment: 'ok' };
    const result = await controller.create(dto);

    expect(result).toEqual(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll when fetching surveys', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      { rating: 5, comment: 'ok' },
      { rating: 3, comment: 'meh' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });
});
