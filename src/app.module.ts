import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { session } from 'grammy';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestjsGrammyModule.forRootAsync({
      imports: [ConfigModule, BotModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
        botName: configService.get<string>('TELEGRAM_BOT_NAME'),
        middlewares: [session()],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
