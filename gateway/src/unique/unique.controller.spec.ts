import { Test, TestingModule } from '@nestjs/testing';
import { UniqueController } from './unique.controller';

describe('UniqueController', () => {
  let controller: UniqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniqueController],
    }).compile();

    controller = module.get<UniqueController>(UniqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
