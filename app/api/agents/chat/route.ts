/**
 * API Route for Chat with Project Manager
 * Endpoint específico para chat continuo con el PM
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrchestrator } from '@/lib/services/agents/orchestrator';
import type { ProjectContext } from '@/lib/types/agents';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatRequestBody {
  message: string;
  sessionId?: string;
  projectContext?: ProjectContext;
}

// Store para mantener sesiones (en producción usar Redis o similar)
const sessions = new Map<string, { lastActivity: Date }>();

/**
 * POST /api/agents/chat
 * Chat continuo con el Project Manager
 */
export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();

    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generar o recuperar sessionId
    const sessionId = body.sessionId || generateSessionId();

    // Actualizar última actividad
    sessions.set(sessionId, { lastActivity: new Date() });

    // Limpiar sesiones antiguas (más de 1 hora)
    cleanOldSessions();

    const orchestrator = getOrchestrator();

    // Actualizar contexto del proyecto si se proporciona
    if (body.projectContext) {
      orchestrator.setProjectContext(body.projectContext);
    }

    // Procesar mensaje
    const result = await orchestrator.processRequest(body.message);

    return NextResponse.json({
      success: true,
      sessionId,
      data: result
    });
  } catch (error) {
    console.error('Error in chat API:', error);

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
 * DELETE /api/agents/chat
 * Limpia el historial de una sesión
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'SessionId is required' },
        { status: 400 }
      );
    }

    // Eliminar sesión
    sessions.delete(sessionId);

    // Limpiar historial del orquestador
    const orchestrator = getOrchestrator();
    orchestrator.clearAllHistory();

    return NextResponse.json({
      success: true,
      message: 'Session cleared'
    });
  } catch (error) {
    console.error('Error clearing chat:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Genera un ID de sesión único
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Limpia sesiones con más de 1 hora de inactividad
 */
function cleanOldSessions(): void {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  for (const [sessionId, session] of sessions.entries()) {
    if (session.lastActivity < oneHourAgo) {
      sessions.delete(sessionId);
    }
  }
}
