import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
  }

  async sendMessage(chatId: number, message: string) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
