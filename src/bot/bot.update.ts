import { Command, Ctx, Hears, Start, Update } from '@grammyjs/nestjs';
import { UseFilters } from '@nestjs/common';
import { Context } from 'grammy';
import { catchError } from 'rxjs';
import { BotService } from './bot.service';
import { GrammyExceptionFilter } from './filters';
import { All, Product, ProductWithCycle } from './types';

@Update()
@UseFilters(GrammyExceptionFilter)
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.api.sendChatAction(ctx.chat.id, 'typing');
    return ctx.reply(
      `<b>Hi ${ctx.from.first_name} ${ctx.from.last_name}.</b>`,
      {
        parse_mode: 'HTML',
      },
    );
  }

  @Command(All)
  async onAll(@Ctx() ctx: Context) {
    await ctx.api.sendChatAction(ctx.chat.id, 'typing');
    this.botService
      .allProducts()
      .pipe(catchError(this.botService.handlerError(ctx)))
      .subscribe({
        next: ({ data }) => {
          this.botService.mapAllProductResponse(data).map((value) => {
            const output = ['<b>endoflife.date Products</b>\n'];
            return ctx.reply(output.concat(value).join('\n'), {
              parse_mode: 'HTML',
            });
          });
        },
      });
  }

  @Hears(Product)
  async onProduct(@Ctx() ctx: Context) {
    await ctx.api.sendChatAction(ctx.chat.id, 'typing');
    const product = ctx.match[1].trim().toLowerCase();
    this.botService
      .allDetails(product)
      .pipe(catchError(this.botService.handlerError(ctx)))
      .subscribe(({ data }) => {
        this.botService.mapProductResponse(data, product).map((value) => {
          return ctx.reply(value.join('\n\n'), { parse_mode: 'HTML' });
        });
      });
  }

  @Hears(ProductWithCycle)
  async onCycle(@Ctx() ctx: Context) {
    await ctx.api.sendChatAction(ctx.chat.id, 'typing');
    const product = ctx.match[1].trim().toLowerCase();
    const cycle = ctx.match[2].trim().toLowerCase();
    this.botService
      .cycleDetailOfProduct(product, cycle)
      .pipe(catchError(this.botService.handlerError(ctx)))
      .subscribe(({ data }) => {
        return ctx.reply(
          this.botService.mapProductWithCycleResponse(data, product, cycle),
          {
            parse_mode: 'HTML',
          },
        );
      });
  }
}
