import { Test, TestingModule } from '@nestjs/testing';
import { BotUpdate } from './bot.update';

describe('BotUpdate', () => {
  let controller: BotUpdate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotUpdate],
    }).compile();

    controller = module.get<BotUpdate>(BotUpdate);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
