/**
 * API Route for Agent Communication
 * Endpoint principal para comunicarse con los agentes
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrchestrator } from '@/lib/services/agents/orchestrator';
import type { AgentRole, AgentContext } from '@/lib/types/agents';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface AgentRequestBody {
  message: string;
  agentRole?: AgentRole;
  context?: Partial<AgentContext>;
  useOrchestrator?: boolean;
}

/**
 * POST /api/agents
 * Procesa mensajes y retorna respuestas de agentes
 */
export async function POST(request: NextRequest) {
  try {
    const body: AgentRequestBody = await request.json();

    // Validar input
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (body.message.length > 10000) {
      return NextResponse.json(
        { error: 'Message is too long (max 10000 characters)' },
        { status: 400 }
      );
    }

    const orchestrator = getOrchestrator();

    // Si se especifica useOrchestrator o no se especifica agentRole,
    // usar el orquestador (Project Manager)
    if (body.useOrchestrator !== false && !body.agentRole) {
      const result = await orchestrator.processRequest(
        body.message,
        body.context
      );

      return NextResponse.json({
        success: true,
        data: result
      });
    }

    // Si se especifica un agente específico, usarlo directamente
    if (body.agentRole) {
      const agent = orchestrator.getAgent(body.agentRole);

      if (!agent) {
        return NextResponse.json(
          { error: `Agent not found: ${body.agentRole}` },
          { status: 404 }
        );
      }

      const response = await agent.process(body.message, body.context);

      return NextResponse.json({
        success: true,
        data: {
          agentResponse: response
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid request configuration' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in agents API:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/agents
 * Obtiene información sobre los agentes disponibles
 */
export async function GET() {
  const agents: Array<{
    role: AgentRole;
    name: string;
    description: string;
  }> = [
    {
      role: 'project_manager',
      name: 'Project Manager',
      description: 'Coordina proyectos y asigna tareas a subagentes'
    },
    {
      role: 'uxui',
      name: 'UX/UI Designer',
      description: 'Diseña interfaces modernas y accesibles'
    },
    {
      role: 'fullstack',
      name: 'Fullstack Developer',
      description: 'Desarrolla componentes, APIs y base de datos'
    },
    {
      role: 'security',
      name: 'Security Analyst',
      description: 'Audita seguridad y detecta vulnerabilidades'
    },
    {
      role: 'docs',
      name: 'Documentation Specialist',
      description: 'Crea documentación técnica y manuales'
    },
    {
      role: 'testing',
      name: 'Testing Engineer',
      description: 'Diseña y ejecuta tests unitarios, integración y E2E'
    },
    {
      role: 'optimization',
      name: 'Performance Optimizer',
      description: 'Optimiza rendimiento y Web Vitals'
    },
    {
      role: 'seo',
      name: 'SEO Specialist',
      description: 'Optimiza SEO y crea contenido persuasivo'
    },
    {
      role: 'deploy',
      name: 'DevOps Engineer',
      description: 'Gestiona despliegues y configuración de infraestructura'
    }
  ];

  return NextResponse.json({
    success: true,
    data: { agents }
  });
}
