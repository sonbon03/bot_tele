import { Command, Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { Context } from 'telegraf';

@Update()
export class TelegramUpdate {
  constructor(private readonly openAIService: OpenAiService) {}
  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply('Chào mừng bạn đến với bot Telegram!');
  }

  @Help()
  async helpCommand(@Ctx() ctx: Context) {
    await ctx.reply('Hướng dẫn sử dụng bot: Gõ /start để bắt đầu.');
  }

  @Command(['test', 'end'])
  async commandList(@Ctx() ctx: Context) {
    // @ts-ignore
    await ctx.reply('command ' + ctx.message.text);
  }

  @Hears('hello')
  async hearsHello(@Ctx() ctx: Context) {
    await ctx.reply('Xin chào! Tôi là bot Telegram');
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    // @ts-ignore
    const message = ctx.message.text;
    try {
      const gptResponse =
        await this.openAIService.generateCohereResponse(message);
      await ctx.reply(gptResponse);
    } catch (error) {
      console.log(error);
      await ctx.reply('Đã xảy ra lỗi khi kết nối với ChatGPT.');
    }
  }
}
