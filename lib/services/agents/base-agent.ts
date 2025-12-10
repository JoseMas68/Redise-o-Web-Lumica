/**
 * Base Agent Class
 * Clase base para todos los agentes del sistema
 */

import type {
  AgentRole,
  AgentMessage,
  AgentContext,
  AgentResponse,
  Deliverable
} from '@/lib/types/agents';
import { promptLoader, type AgentPrompts } from './prompt-loader';

export interface BaseAgentConfig {
  role: AgentRole;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export abstract class BaseAgent {
  protected role: AgentRole;
  protected prompts: AgentPrompts;
  protected conversationHistory: AgentMessage[] = [];
  protected config: Required<BaseAgentConfig>;

  constructor(config: BaseAgentConfig) {
    this.role = config.role;
    this.prompts = promptLoader.loadAgentPrompts(config.role);
    this.config = {
      role: config.role,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 2000,
      model: config.model ?? 'gpt-4'
    };
  }

  /**
   * Procesa un mensaje del usuario y retorna una respuesta
   */
  async process(
    message: string,
    context?: AgentContext
  ): Promise<AgentResponse> {
    // Validar entrada
    if (!this.validateInput(message)) {
      throw new Error('Invalid input message');
    }

    // Agregar contexto al historial si existe
    if (context?.conversationHistory) {
      this.conversationHistory = context.conversationHistory;
    }

    // Construir mensajes para la API
    const messages = this.buildMessages(message, context);

    // Procesar con el modelo de IA
    const response = await this.callAI(messages);

    // Guardar en el historial
    this.addToHistory({
      role: 'user',
      content: message,
      agentId: this.role
    });

    this.addToHistory({
      role: 'assistant',
      content: response.content,
      agentId: this.role
    });

    return response;
  }

  /**
   * Método abstracto para llamar a la IA
   * Debe ser implementado por cada agente específico
   */
  protected abstract callAI(messages: AgentMessage[]): Promise<AgentResponse>;

  /**
   * Construye los mensajes para enviar a la IA
   */
  protected buildMessages(
    userMessage: string,
    context?: AgentContext
  ): AgentMessage[] {
    const messages: AgentMessage[] = [
      {
        role: 'system',
        content: this.prompts.system,
        timestamp: new Date()
      }
    ];

    // Agregar contexto del proyecto si existe
    if (context?.projectContext) {
      messages.push({
        role: 'system',
        content: `CONTEXTO DEL PROYECTO:\n${JSON.stringify(context.projectContext, null, 2)}`,
        timestamp: new Date()
      });
    }

    // Agregar historial de conversación
    if (this.conversationHistory.length > 0) {
      messages.push(...this.conversationHistory.slice(-10)); // Últimos 10 mensajes
    }

    // Agregar mensaje del usuario
    messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
      agentId: this.role
    });

    return messages;
  }

  /**
   * Valida la entrada del usuario
   */
  protected validateInput(message: string): boolean {
    return message.trim().length > 0 && message.length <= 10000;
  }

  /**
   * Añade un mensaje al historial
   */
  protected addToHistory(message: AgentMessage): void {
    this.conversationHistory.push({
      ...message,
      timestamp: message.timestamp || new Date()
    });
  }

  /**
   * Obtiene el historial de conversación
   */
  getHistory(): AgentMessage[] {
    return [...this.conversationHistory];
  }

  /**
   * Limpia el historial
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Obtiene el rol del agente
   */
  getRole(): AgentRole {
    return this.role;
  }

  /**
   * Obtiene los prompts del agente
   */
  getPrompts(): AgentPrompts {
    return this.prompts;
  }

  /**
   * Formatea la respuesta del agente
   */
  protected formatResponse(
    content: string,
    deliverables?: Deliverable[],
    metadata?: Record<string, any>
  ): AgentResponse {
    return {
      agentId: this.role,
      content,
      deliverables,
      timestamp: new Date(),
      metadata
    };
  }

  /**
   * Extrae deliverables del contenido de la respuesta
   */
  protected extractDeliverables(content: string): Deliverable[] {
    const deliverables: Deliverable[] = [];

    // Buscar bloques de código y texto estructurado
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text';
      const code = match[2].trim();

      deliverables.push({
        type: 'CODE_SNIPPET',
        title: `${language} snippet`,
        content: code,
        format: 'code',
        language
      });
    }

    return deliverables;
  }
}
