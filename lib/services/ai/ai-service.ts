/**
 * AI Service
 * Servicio centralizado para interactuar con APIs de IA (OpenAI, Anthropic, etc.)
 */

import type { AgentMessage, AgentResponse } from '@/lib/types/agents';

export interface AIServiceConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  provider?: 'openai' | 'anthropic' | 'mock';
}

export class AIService {
  private config: Required<AIServiceConfig>;

  constructor(config: AIServiceConfig) {
    this.config = {
      apiKey: config.apiKey,
      model: config.model ?? 'gpt-4',
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 2000,
      provider: config.provider ?? 'openai'
    };
  }

  /**
   * Genera una respuesta usando el modelo de IA
   */
  async generateResponse(
    messages: AgentMessage[],
    agentId: string
  ): Promise<string> {
    if (this.config.provider === 'mock') {
      return this.mockResponse(messages, agentId);
    }

    if (this.config.provider === 'openai') {
      return this.callOpenAI(messages);
    }

    if (this.config.provider === 'anthropic') {
      return this.callAnthropic(messages);
    }

    throw new Error(`Unsupported AI provider: ${this.config.provider}`);
  }

  /**
   * Llamada a OpenAI API
   */
  private async callOpenAI(messages: AgentMessage[]): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }

  /**
   * Llamada a Anthropic API (Claude)
   */
  private async callAnthropic(messages: AgentMessage[]): Promise<string> {
    try {
      // Separar system message de los demás
      const systemMessage = messages.find(m => m.role === 'system');
      const otherMessages = messages.filter(m => m.role !== 'system');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.config.model,
          system: systemMessage?.content || '',
          messages: otherMessages.map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content
          })),
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Anthropic API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.content[0]?.text || '';
    } catch (error) {
      console.error('Error calling Anthropic:', error);
      throw error;
    }
  }

  /**
   * Respuesta mock para desarrollo/testing
   */
  private mockResponse(messages: AgentMessage[], agentId: string): Promise<string> {
    const lastMessage = messages[messages.length - 1];

    const mockResponses: Record<string, string> = {
      project_manager: `He analizado tu solicitud: "${lastMessage.content}"\n\nPLAN DE TRABAJO:\n1. Análisis de requerimientos\n2. Diseño UX/UI\n3. Desarrollo\n4. Testing\n5. Deploy\n\nAsignando tareas a los subagentes correspondientes...`,

      uxui: `DISEÑO UX/UI PROPUESTO:\n\n## Wireframes\n- Layout moderno con bento grid\n- Diseño minimalista estilo Apple\n- Navegación intuitiva\n\n## Design Tokens\n\`\`\`json\n{\n  "colors": {\n    "primary": "#000000",\n    "secondary": "#ffffff",\n    "accent": "#3b82f6"\n  },\n  "spacing": "8px base"\n}\n\`\`\``,

      fullstack: `IMPLEMENTACIÓN:\n\n\`\`\`typescript\n// Componente React\nexport function Component() {\n  return <div>Implementación lista</div>\n}\n\`\`\`\n\n\`\`\`typescript\n// API Route\nexport async function POST(request: Request) {\n  return Response.json({ success: true })\n}\n\`\`\``,

      security: `ANÁLISIS DE SEGURIDAD:\n\n✓ Sin vulnerabilidades XSS detectadas\n✓ CSRF protection implementada\n✓ Validación de inputs correcta\n\n⚠️ Recomendaciones:\n- Implementar rate limiting\n- Añadir helmet.js para headers de seguridad`,

      docs: `DOCUMENTACIÓN GENERADA:\n\n# README\n\n## Instalación\n\`\`\`bash\nnpm install\n\`\`\`\n\n## Uso\n\`\`\`bash\nnpm run dev\n\`\`\`\n\n## Arquitectura\nProyecto Next.js 15 con App Router...`,

      testing: `TESTS GENERADOS:\n\n\`\`\`typescript\nimport { describe, it, expect } from 'vitest'\n\ndescribe('Component', () => {\n  it('should render', () => {\n    expect(true).toBe(true)\n  })\n})\n\`\`\``,

      optimization: `ANÁLISIS DE PERFORMANCE:\n\n## Métricas actuales\n- LCP: 2.1s ⚠️\n- CLS: 0.05 ✓\n- INP: 180ms ✓\n\n## Optimizaciones sugeridas\n1. Lazy load de imágenes\n2. Code splitting\n3. Caché de API`,

      seo: `OPTIMIZACIÓN SEO:\n\n## Keywords principales\n- desarrollo web\n- diseño UX/UI\n- Next.js\n\n## Meta tags\n\`\`\`html\n<title>Título optimizado | Lumica</title>\n<meta name="description" content="...">\n\`\`\``,

      deploy: `ESTRATEGIA DE DEPLOY:\n\n## Configuración Docker\n\`\`\`dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]\n\`\`\`\n\n## Deploy en Vercel\n1. Conectar repositorio\n2. Configurar variables de entorno\n3. Deploy automático`
    };

    return Promise.resolve(
      mockResponses[agentId] || `Respuesta del agente ${agentId}: ${lastMessage.content}`
    );
  }

  /**
   * Actualiza la configuración
   */
  updateConfig(config: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Factory para crear instancias del servicio
export function createAIService(config?: Partial<AIServiceConfig>): AIService {
  const apiKey = process.env.OPENAI_API_KEY ||
                 process.env.ANTHROPIC_API_KEY ||
                 'mock-key';

  const provider = process.env.AI_PROVIDER as 'openai' | 'anthropic' | 'mock' ||
                   (apiKey === 'mock-key' ? 'mock' : 'openai');

  return new AIService({
    apiKey,
    provider,
    ...config
  });
}
