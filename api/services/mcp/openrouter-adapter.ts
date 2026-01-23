import axios from 'axios';
import { MCPBaseService } from '../core/mcp-base';

interface OpenRouterRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
}

export class OpenRouterAdapter extends MCPBaseService {
  private apiKey: string;
  private readonly baseURL = 'https://openrouter.ai/api/v1';

  constructor() {
    super('openrouter-adapter');
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
  }

  async execute(payload: OpenRouterRequest) {
    try {
      const response = await axios.post(`${this.baseURL}/chat/completions`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://cofounder.local',
          'X-Title': 'Cofounder IDE' 
        },
        timeout: 30000
      });

      return {
        content: response.data.choices[0].message.content,
        usage: response.data.usage
      };
    } catch (error) {
      this.logger.error('OpenRouter API error:', error);
      throw new Error('OpenRouter service request failed');
    }
  }
}