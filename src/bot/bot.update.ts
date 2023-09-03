import { Ctx, Hears, Start, Update } from '@grammyjs/nestjs';
import { UseFilters } from '@nestjs/common';
import { Context } from 'grammy';
import { BotService } from "./bot.service";
import { GrammyExceptionFilter } from './filters';

@Update()
@UseFilters(GrammyExceptionFilter)
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return ctx.reply(
      `<b>Hi ${ctx.from.first_name} ${ctx.from.last_name}.</b>`,
      {
        parse_mode: 'HTML',
      },
    );
  }

  @Hears(/^\/product (?<product>.*)/)
  onProduct(@Ctx() ctx: Context) {
    const product = ctx.match[1];
    this.botService.allDetails(product).subscribe(({ data }) => {
      return ctx.reply(`\`${JSON.stringify(data, null, 2)}\``, {
        parse_mode: 'MarkdownV2',
      });
    });
  }
}
