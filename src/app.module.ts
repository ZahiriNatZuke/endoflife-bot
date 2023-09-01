import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestjsGrammyModule.forRoot({
      botName: process.env['TELEGRAM_BOT_NAME'],
      token: process.env['TELEGRAM_BOT_TOKEN'],
      include: [BotModule],
    }),
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
