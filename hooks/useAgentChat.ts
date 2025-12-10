/**
 * useAgentChat Hook
 * Hook personalizado para interactuar con el sistema de agentes
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import type {
  AgentRole,
  AgentContext,
  ProjectContext
} from '@/lib/types/agents';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentId?: AgentRole;
  timestamp: Date;
  deliverables?: any[];
}

interface UseAgentChatOptions {
  agentRole?: AgentRole;
  useOrchestrator?: boolean;
  projectContext?: ProjectContext;
  onError?: (error: Error) => void;
}

interface UseAgentChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  sessionId: string | null;
  workPlan: any;
}

export function useAgentChat(options: UseAgentChatOptions = {}): UseAgentChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [workPlan, setWorkPlan] = useState<any>(null);

  const messageIdCounter = useRef(0);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      setIsLoading(true);
      setError(null);

      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: `msg-${Date.now()}-${messageIdCounter.current++}`,
        role: 'user',
        content: message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      try {
        // Determinar endpoint
        const endpoint = options.useOrchestrator !== false
          ? '/api/agents/chat'
          : '/api/agents';

        // Construir body
        const body: any = {
          message,
          agentRole: options.agentRole,
          useOrchestrator: options.useOrchestrator,
          context: {
            projectContext: options.projectContext
          } as AgentContext
        };

        if (sessionId) {
          body.sessionId = sessionId;
        }

        // Llamar a la API
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to get response from agent');
        }

        const data = await response.json();

        // Guardar sessionId si es nuevo
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }

        // Procesar respuesta
        if (data.data.pmResponse) {
          // Respuesta del orquestador
          const pmResponse = data.data.pmResponse;

          setMessages(prev => [
            ...prev,
            {
              id: `msg-${Date.now()}-${messageIdCounter.current++}`,
              role: 'assistant',
              content: pmResponse.content,
              agentId: 'project_manager',
              timestamp: new Date(pmResponse.timestamp),
              deliverables: pmResponse.deliverables
            }
          ]);

          // Actualizar plan de trabajo
          if (data.data.workPlan) {
            setWorkPlan(data.data.workPlan);
          }

          // Agregar resultados de subtareas
          if (data.data.subtaskResults && data.data.subtaskResults.length > 0) {
            const subtaskMessages: Message[] = data.data.subtaskResults
              .filter((result: any) => result.response)
              .map((result: any) => ({
                id: `msg-${Date.now()}-${messageIdCounter.current++}`,
                role: 'assistant' as const,
                content: result.response.content,
                agentId: result.agentRole,
                timestamp: new Date(result.response.timestamp),
                deliverables: result.response.deliverables
              }));

            setMessages(prev => [...prev, ...subtaskMessages]);
          }
        } else if (data.data.agentResponse) {
          // Respuesta directa de un agente
          const agentResponse = data.data.agentResponse;

          setMessages(prev => [
            ...prev,
            {
              id: `msg-${Date.now()}-${messageIdCounter.current++}`,
              role: 'assistant',
              content: agentResponse.content,
              agentId: agentResponse.agentId,
              timestamp: new Date(agentResponse.timestamp),
              deliverables: agentResponse.deliverables
            }
          ]);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options.onError?.(error);

        // Agregar mensaje de error
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}-${messageIdCounter.current++}`,
            role: 'system',
            content: `Error: ${error.message}`,
            timestamp: new Date()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [options, sessionId]
  );

  const clearMessages = useCallback(async () => {
    setMessages([]);
    setError(null);
    setWorkPlan(null);

    // Limpiar sesión en el servidor
    if (sessionId) {
      try {
        await fetch(`/api/agents/chat?sessionId=${sessionId}`, {
          method: 'DELETE'
        });
      } catch (err) {
        console.error('Error clearing session:', err);
      }

      setSessionId(null);
    }
  }, [sessionId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    sessionId,
    workPlan
  };
}
