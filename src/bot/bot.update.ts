import { Ctx, Start, Update } from '@grammyjs/nestjs';
import { UseFilters } from '@nestjs/common';
import { Context } from 'grammy';
import { BotService } from './bot.service';
import { GrammyExceptionFilter } from './lib';

@Update()
@UseFilters(GrammyExceptionFilter)
export class BotUpdate {
  constructor(private botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return ctx.reply('<b>Hi ${ctx.from.first_name}.</b>', {
      parse_mode: 'HTML',
    });
  }
}
