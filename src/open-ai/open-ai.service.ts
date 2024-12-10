import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { CohereClient } from 'cohere-ai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;
  private cohere;

  constructor() {
    this.cohere = new CohereClient({
      token: process.env.API_KEY,
    });
  }

  async generateCohereResponse(prompt: string): Promise<string> {
    try {
      const response = await this.cohere.generate({
        model: 'command',
        prompt,
        max_tokens: 300,
      });
      console.log(response);
      return response.generations[0].text.trim();
    } catch (error) {
      console.error('Error interacting with Cohere:', error);
      throw error;
    }
  }
}
