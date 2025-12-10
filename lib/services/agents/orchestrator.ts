/**
 * Agent Orchestrator (Project Manager)
 * Coordina y gestiona todos los subagentes
 */

import type {
  AgentRole,
  AgentContext,
  AgentResponse,
  WorkPlan,
  SubtaskAssignment,
  ProjectContext
} from '@/lib/types/agents';

import { SpecializedAgent } from './specialized-agent';
import {
  createUXUIAgent,
  createFullstackAgent,
  createSecurityAgent,
  createDocsAgent,
  createTestingAgent,
  createOptimizationAgent,
  createSEOAgent,
  createDeployAgent
} from './specialized-agent';

export class AgentOrchestrator {
  private pmAgent: SpecializedAgent;
  private subAgents: Map<AgentRole, SpecializedAgent>;
  private workPlan?: WorkPlan;
  private projectContext?: ProjectContext;

  constructor() {
    // Crear el agente PM
    this.pmAgent = new SpecializedAgent({
      role: 'project_manager',
      temperature: 0.7,
      maxTokens: 3000
    });

    // Inicializar subagentes
    this.subAgents = new Map([
      ['uxui', createUXUIAgent()],
      ['fullstack', createFullstackAgent()],
      ['security', createSecurityAgent()],
      ['docs', createDocsAgent()],
      ['testing', createTestingAgent()],
      ['optimization', createOptimizationAgent()],
      ['seo', createSEOAgent()],
      ['deploy', createDeployAgent()]
    ]);
  }

  /**
   * Procesa una solicitud del usuario
   * El PM analiza, crea un plan y coordina subagentes
   */
  async processRequest(
    userMessage: string,
    context?: Partial<AgentContext>
  ): Promise<OrchestratorResponse> {
    try {
      // 1. El PM analiza la solicitud y crea un plan
      const pmResponse = await this.pmAgent.process(userMessage, {
        ...context,
        projectContext: this.projectContext
      });

      // 2. Extraer el plan de trabajo del PM
      this.workPlan = this.extractWorkPlan(pmResponse.content);

      // 3. Ejecutar subtareas si el plan está completo
      const subtaskResults: SubtaskResult[] = [];

      if (this.workPlan && this.canExecutePlan(this.workPlan)) {
        for (const subtask of this.workPlan.subtasks) {
          if (subtask.status === 'pending') {
            const result = await this.executeSubtask(subtask);
            subtaskResults.push(result);
          }
        }
      }

      return {
        pmResponse,
        workPlan: this.workPlan,
        subtaskResults,
        requiresUserInput: this.requiresUserInput(pmResponse, this.workPlan)
      };
    } catch (error) {
      console.error('Error in orchestrator:', error);
      throw error;
    }
  }

  /**
   * Ejecuta una subtarea específica con el agente asignado
   */
  private async executeSubtask(
    subtask: SubtaskAssignment
  ): Promise<SubtaskResult> {
    const agent = this.subAgents.get(subtask.assignedTo);

    if (!agent) {
      throw new Error(`Agent not found: ${subtask.assignedTo}`);
    }

    // Marcar como en progreso
    subtask.status = 'in_progress';

    try {
      const response = await agent.process(subtask.description, {
        projectContext: this.projectContext
      });

      // Marcar como completada
      subtask.status = 'completed';

      return {
        subtaskId: subtask.subtaskId,
        agentRole: subtask.assignedTo,
        response,
        status: 'completed'
      };
    } catch (error) {
      subtask.status = 'blocked';

      return {
        subtaskId: subtask.subtaskId,
        agentRole: subtask.assignedTo,
        status: 'blocked',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Extrae el plan de trabajo de la respuesta del PM
   */
  private extractWorkPlan(pmContent: string): WorkPlan | undefined {
    try {
      // Buscar sección de plan de trabajo
      const planSection = pmContent.match(
        /(?:PLAN(?:_DE_TRABAJO)?|WORK\s*PLAN):?\s*\n([\s\S]+?)(?:\n\n|$)/i
      );

      if (!planSection) {
        return undefined;
      }

      const subtasks: SubtaskAssignment[] = [];

      // Extraer subtareas y asignaciones
      const taskPattern = /(\d+)\.\s*(.+?)(?:\s*-\s*Agente:\s*(\w+))?(?:\s*-\s*Prioridad:\s*(\w+))?/gi;
      const matches = planSection[1].matchAll(taskPattern);

      for (const match of matches) {
        const [, number, description, agent, priority] = match;

        subtasks.push({
          subtaskId: `task-${number}`,
          description: description.trim(),
          assignedTo: (agent?.toLowerCase() as AgentRole) || 'fullstack',
          priority: (priority?.toLowerCase() as 'high' | 'medium' | 'low') || 'medium',
          status: 'pending'
        });
      }

      // Buscar información faltante
      const missingInfoPattern = /(?:PREGUNTAS|QUESTIONS|INFORMACIÓN\s*FALTANTE):?\s*\n((?:[-*]\s*.+\n?)+)/i;
      const missingInfoMatch = pmContent.match(missingInfoPattern);
      const missingInfo = missingInfoMatch
        ? missingInfoMatch[1]
            .split('\n')
            .map(q => q.replace(/^[-*]\s*/, '').trim())
            .filter(q => q.length > 0)
        : [];

      return {
        projectGoal: 'Extracted from PM response',
        subtasks,
        missingInfo
      };
    } catch (error) {
      console.error('Error extracting work plan:', error);
      return undefined;
    }
  }

  /**
   * Verifica si se puede ejecutar el plan
   */
  private canExecutePlan(plan: WorkPlan): boolean {
    return !plan.missingInfo || plan.missingInfo.length === 0;
  }

  /**
   * Verifica si se requiere input del usuario
   */
  private requiresUserInput(
    pmResponse: AgentResponse,
    plan?: WorkPlan
  ): boolean {
    if (plan?.missingInfo && plan.missingInfo.length > 0) {
      return true;
    }

    if (pmResponse.metadata?.questionsForUser?.length > 0) {
      return true;
    }

    return false;
  }

  /**
   * Actualiza el contexto del proyecto
   */
  setProjectContext(context: ProjectContext): void {
    this.projectContext = context;
  }

  /**
   * Obtiene el contexto del proyecto
   */
  getProjectContext(): ProjectContext | undefined {
    return this.projectContext;
  }

  /**
   * Obtiene el plan de trabajo actual
   */
  getWorkPlan(): WorkPlan | undefined {
    return this.workPlan;
  }

  /**
   * Obtiene un agente específico
   */
  getAgent(role: AgentRole): SpecializedAgent | undefined {
    return role === 'project_manager' ? this.pmAgent : this.subAgents.get(role);
  }

  /**
   * Limpia el historial de todos los agentes
   */
  clearAllHistory(): void {
    this.pmAgent.clearHistory();
    this.subAgents.forEach(agent => agent.clearHistory());
    this.workPlan = undefined;
  }
}

export interface OrchestratorResponse {
  pmResponse: AgentResponse;
  workPlan?: WorkPlan;
  subtaskResults: SubtaskResult[];
  requiresUserInput: boolean;
}

export interface SubtaskResult {
  subtaskId: string;
  agentRole: AgentRole;
  response?: AgentResponse;
  status: 'completed' | 'blocked';
  error?: string;
}

// Singleton instance
let orchestratorInstance: AgentOrchestrator | null = null;

export function getOrchestrator(): AgentOrchestrator {
  if (!orchestratorInstance) {
    orchestratorInstance = new AgentOrchestrator();
  }
  return orchestratorInstance;
}
