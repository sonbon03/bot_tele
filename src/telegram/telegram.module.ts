import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { TelegramUpdate } from './telegram.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
      }),
    }),
  ],
  providers: [TelegramService, OpenAiService, TelegramUpdate],
})
export class TelegramModule {}
