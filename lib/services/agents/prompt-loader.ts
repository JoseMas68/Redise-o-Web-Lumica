/**
 * Prompt Loader
 * Sistema para cargar prompts desde archivos .md
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import type { AgentRole, AgentMessage } from '@/lib/types/agents';

export interface AgentPrompts {
  system: string;
  assistant: string;
  user: string;
}

export class PromptLoader {
  private basePath: string;

  constructor(basePath: string = '../../../agents') {
    this.basePath = basePath;
  }

  /**
   * Carga los prompts de un agente específico
   */
  loadAgentPrompts(agentRole: AgentRole): AgentPrompts {
    const agentPath = join(process.cwd(), 'agents', agentRole);

    try {
      const system = this.loadPromptFile(agentPath, 'system.md');
      const assistant = this.loadPromptFile(agentPath, 'assistant.md');
      const user = this.loadPromptFile(agentPath, 'user.md');

      return { system, assistant, user };
    } catch (error) {
      console.error(`Error loading prompts for agent ${agentRole}:`, error);
      return this.getDefaultPrompts(agentRole);
    }
  }

  /**
   * Lee un archivo de prompt
   */
  private loadPromptFile(agentPath: string, filename: string): string {
    try {
      const filePath = join(agentPath, filename);
      return readFileSync(filePath, 'utf-8').trim();
    } catch (error) {
      console.warn(`Could not load ${filename} from ${agentPath}`);
      return '';
    }
  }

  /**
   * Convierte prompts a mensajes de chat
   */
  toMessages(prompts: AgentPrompts, userMessage?: string): AgentMessage[] {
    const messages: AgentMessage[] = [
      {
        role: 'system',
        content: prompts.system,
        timestamp: new Date()
      }
    ];

    if (prompts.assistant) {
      messages.push({
        role: 'assistant',
        content: prompts.assistant,
        timestamp: new Date()
      });
    }

    if (userMessage) {
      messages.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      });
    }

    return messages;
  }

  /**
   * Obtiene prompts por defecto si no se pueden cargar desde archivos
   */
  private getDefaultPrompts(agentRole: AgentRole): AgentPrompts {
    const defaults: Record<AgentRole, AgentPrompts> = {
      project_manager: {
        system: 'Eres el AGENTE PROJECT MANAGER. Tu misión es coordinar proyectos y asignar tareas a subagentes.',
        assistant: 'Listo para gestionar el proyecto. ¿Qué quieres crear?',
        user: 'El usuario describe el proyecto.'
      },
      uxui: {
        system: 'Eres UX/UI Designer Senior. Creas diseños modernos y accesibles.',
        assistant: 'Diseño listo. ¿Qué parte necesitas?',
        user: 'El PM solicita elementos de diseño.'
      },
      fullstack: {
        system: 'Eres Fullstack Developer Senior con React 19, Next.js 15, Tailwind y PostgreSQL.',
        assistant: 'Código listo. ¿Qué componente o endpoint necesitas?',
        user: 'El PM solicita desarrollo.'
      },
      security: {
        system: 'Eres Security Analyst experto en OWASP Top 10 y seguridad web.',
        assistant: '¿Qué parte debo auditar?',
        user: 'El PM entrega el código o arquitectura.'
      },
      docs: {
        system: 'Eres el agente documentalista especializado en crear documentación técnica.',
        assistant: '¿Qué documento debo generar?',
        user: 'El PM solicita documentación.'
      },
      testing: {
        system: 'Eres experto en testing (Unit, Integration, E2E, DDS) con Jest, Vitest y Playwright.',
        assistant: '¿Qué módulo o feature debo testear?',
        user: 'El PM entrega el código o feature.'
      },
      optimization: {
        system: 'Eres Performance Optimizer experto en Web Vitals y optimización.',
        assistant: '¿Qué parte debo optimizar?',
        user: 'El PM especifica el recurso.'
      },
      seo: {
        system: 'Eres especialista en SEO técnico, On-Page y copywriting persuasivo.',
        assistant: '¿Qué texto o página debo optimizar?',
        user: 'El PM especifica contenido.'
      },
      deploy: {
        system: 'Eres experto en despliegues y DevOps con Docker, Nginx y CI/CD.',
        assistant: 'Listo para generar estrategia de despliegue.',
        user: 'El PM solicita configuración de deploy.'
      }
    };

    return defaults[agentRole];
  }
}

// Singleton instance
export const promptLoader = new PromptLoader();
