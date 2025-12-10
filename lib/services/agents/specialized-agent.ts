/**
 * Specialized Agent
 * Implementación concreta de agentes especializados
 */

import { BaseAgent, type BaseAgentConfig } from './base-agent';
import type { AgentMessage, AgentResponse } from '@/lib/types/agents';
import { createAIService } from '../ai/ai-service';

export class SpecializedAgent extends BaseAgent {
  private aiService = createAIService();

  constructor(config: BaseAgentConfig) {
    super(config);
  }

  /**
   * Llama al servicio de IA para procesar el mensaje
   */
  protected async callAI(messages: AgentMessage[]): Promise<AgentResponse> {
    try {
      // Llamar al servicio de IA
      const content = await this.aiService.generateResponse(messages, this.role);

      // Extraer deliverables del contenido
      const deliverables = this.extractDeliverables(content);

      // Extraer próximos pasos y preguntas
      const nextSteps = this.extractNextSteps(content);
      const questionsForUser = this.extractQuestions(content);

      return this.formatResponse(content, deliverables, {
        nextSteps,
        questionsForUser
      });
    } catch (error) {
      console.error(`Error in ${this.role} agent:`, error);
      throw new Error(`Failed to process message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extrae los próximos pasos del contenido
   */
  private extractNextSteps(content: string): string[] {
    const steps: string[] = [];

    // Buscar secciones de próximos pasos
    const patterns = [
      /(?:próximos pasos|next steps|siguientes pasos):\s*\n((?:[-*]\s*.+\n?)+)/gi,
      /(?:tareas pendientes|pending tasks):\s*\n((?:[-*]\s*.+\n?)+)/gi
    ];

    for (const pattern of patterns) {
      const match = pattern.exec(content);
      if (match) {
        const stepsList = match[1]
          .split('\n')
          .map(s => s.replace(/^[-*]\s*/, '').trim())
          .filter(s => s.length > 0);
        steps.push(...stepsList);
      }
    }

    return steps;
  }

  /**
   * Extrae preguntas para el usuario del contenido
   */
  private extractQuestions(content: string): string[] {
    const questions: string[] = [];

    // Buscar secciones de preguntas
    const patterns = [
      /(?:preguntas|questions|necesito saber):\s*\n((?:[-*]\s*.+\?+\n?)+)/gi,
      /¿[^?]+\?/g
    ];

    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          // Si hay grupo de captura (lista)
          const questionList = match[1]
            .split('\n')
            .map(q => q.replace(/^[-*]\s*/, '').trim())
            .filter(q => q.includes('?'));
          questions.push(...questionList);
        } else {
          // Si es una pregunta individual
          questions.push(match[0].trim());
        }
      }
    }

    return [...new Set(questions)]; // Eliminar duplicados
  }
}

// Factory functions para crear cada tipo de agente

export function createUXUIAgent() {
  return new SpecializedAgent({
    role: 'uxui',
    temperature: 0.8, // Más creativo para diseño
    maxTokens: 2500
  });
}

export function createFullstackAgent() {
  return new SpecializedAgent({
    role: 'fullstack',
    temperature: 0.5, // Balanceado para código
    maxTokens: 3000
  });
}

export function createSecurityAgent() {
  return new SpecializedAgent({
    role: 'security',
    temperature: 0.3, // Más determinístico para análisis
    maxTokens: 2000
  });
}

export function createDocsAgent() {
  return new SpecializedAgent({
    role: 'docs',
    temperature: 0.6,
    maxTokens: 3000
  });
}

export function createTestingAgent() {
  return new SpecializedAgent({
    role: 'testing',
    temperature: 0.4,
    maxTokens: 2500
  });
}

export function createOptimizationAgent() {
  return new SpecializedAgent({
    role: 'optimization',
    temperature: 0.4,
    maxTokens: 2000
  });
}

export function createSEOAgent() {
  return new SpecializedAgent({
    role: 'seo',
    temperature: 0.7,
    maxTokens: 2500
  });
}

export function createDeployAgent() {
  return new SpecializedAgent({
    role: 'deploy',
    temperature: 0.5,
    maxTokens: 2500
  });
}
