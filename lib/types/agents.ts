/**
 * Agent Types and Interfaces
 * Tipos centralizados para el sistema de agentes
 */

export type AgentRole =
  | 'project_manager'
  | 'uxui'
  | 'fullstack'
  | 'security'
  | 'docs'
  | 'testing'
  | 'optimization'
  | 'seo'
  | 'deploy';

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  agentId?: AgentRole;
}

export interface AgentContext {
  conversationHistory?: AgentMessage[];
  userInfo?: Record<string, any>;
  projectContext?: ProjectContext;
  metadata?: Record<string, any>;
}

export interface ProjectContext {
  name?: string;
  description?: string;
  stack?: string[];
  requirements?: string[];
  currentPhase?: 'planning' | 'design' | 'development' | 'testing' | 'deployment';
}

export interface AgentResponse {
  agentId: AgentRole;
  content: string;
  deliverables?: Deliverable[];
  nextSteps?: string[];
  questionsForUser?: string[];
  confidence?: number;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface Deliverable {
  type: DeliverableType;
  title: string;
  content: string;
  format?: 'text' | 'code' | 'markdown' | 'json';
  language?: string;
}

export type DeliverableType =
  // Project Manager
  | 'PLAN_DE_TRABAJO'
  | 'ASIGNACIONES'
  | 'CONSOLIDATED_OUTPUT'
  | 'PREGUNTAS'
  // UX/UI
  | 'WIREFRAMES_TEXTUALES'
  | 'USER_FLOW'
  | 'UI_CONCEPT'
  | 'DESIGN_TOKENS'
  // Fullstack
  | 'COMPONENT_IMPLEMENTATION'
  | 'API_ENDPOINT'
  | 'SCHEMA_DB'
  | 'CODE_SNIPPET'
  // Security
  | 'SECURITY_REPORT'
  | 'RISK_MATRIX'
  | 'PATCH_RECOMMENDATIONS'
  // Docs
  | 'README'
  | 'TECH_DOC'
  | 'API_DOC'
  | 'ARCHITECTURE_OVERVIEW'
  // Testing
  | 'UNIT_TESTS'
  | 'INTEGRATION_TESTS'
  | 'E2E_TESTS'
  | 'DDS_SCENARIOS'
  | 'ACCEPTANCE_CRITERIA'
  // Optimization
  | 'OPTIMIZATION_REPORT'
  | 'BOTTLENECKS'
  | 'IMPROVEMENT_LIST'
  // SEO
  | 'SEO_REPORT'
  | 'OPTIMIZED_COPY'
  | 'KEYWORDS_CLUSTERS'
  | 'RICH_SNIPPETS'
  // Deploy
  | 'DEPLOY_STRATEGY'
  | 'DOCKER_COMPOSE_FILE'
  | 'NGINX_CONFIG'
  | 'CI_PIPELINE'
  | 'DEPLOY_STEPS';

export interface SubtaskAssignment {
  subtaskId: string;
  description: string;
  assignedTo: AgentRole;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dependencies?: string[];
  estimatedTime?: string;
}

export interface WorkPlan {
  projectGoal: string;
  subtasks: SubtaskAssignment[];
  timeline?: string;
  risks?: string[];
  missingInfo?: string[];
}
