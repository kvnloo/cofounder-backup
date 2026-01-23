import { Ollama } from 'ollama-node';
import { MCPBaseService } from '../core/mcp-base';

export class OllamaProxyService extends MCPBaseService {
  private ollama: Ollama;

  constructor() {
    super('ollama-proxy');
    this.ollama = new Ollama({
      host: 'http://localhost:11434',
      timeout: 60_000
    });
  }

  async execute(payload: any) {
    const { model, prompt, stream = false } = payload;
    
    try {
      if (stream) {
        const stream = await this.ollama.stream(model, prompt);
        return { stream, type: 'application/x-ndjson' };
      }

      const response = await this.ollama.generate(model, prompt);
      return { 
        response,
        usage: {
          input_tokens: prompt.length / 4,
          output_tokens: response.length / 4
        }
      };
    } catch (error) {
      this.logger.error('OllamaProxy error:', error);
      throw new Error('OllamaProxy service failed');
    }
  }
}