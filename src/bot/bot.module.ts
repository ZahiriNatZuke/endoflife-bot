import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [HttpModule],
  providers: [BotService, BotUpdate],
  exports: [BotUpdate],
})
export class BotModule {}
