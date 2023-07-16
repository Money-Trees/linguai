import { Prompt } from '@naite/types';
import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { env } from '../../env';

@Injectable()
export class LessonService {
  private configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
    organization: env.OPENAI_ORG_ID,
  });

  private openai = new OpenAIApi(this.configuration);

  private defaultOptions = { model: 'gpt-3.5-turbo', temperature: 0.7 };

  public createChatCompletion = async <T>(
    prompt: Prompt<T>,
    logger: Logger
  ): Promise<any> => {
    const response = await this.openai.createChatCompletion({
      ...this.defaultOptions,
      messages: [{ role: 'user' as const, content: prompt.render() }],
    });
    const result = response.data.choices[0];

    logger.log('created open ai chat completion', {
      openai: {
        model: response.data.model,
        prompt: {
          id: prompt.template.id,
          params: prompt.params,
          text: prompt.render(),
        },
        result: {
          text: result?.message?.content,
          finish_reason: result?.finish_reason,
        },
        tokens: response.data.usage,
        status: response.status,
      },
    });

    return result?.message?.content;
  };
}
