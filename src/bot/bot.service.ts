import { InjectBot } from '@grammyjs/nestjs';
import { Injectable } from '@nestjs/common';
import { Bot, Context } from 'grammy';

@Injectable()
export class BotService {
  constructor(
    @InjectBot(process.env['TELEGRAM_BOT_NAME'])
    private readonly _bot: Bot<Context>,
  ) {}

  get bot() {
    return this._bot;
  }
}
