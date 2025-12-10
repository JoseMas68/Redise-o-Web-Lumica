/**
 * Agent Chat Component
 * Componente principal para chat con agentes
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Trash2, ChevronDown } from 'lucide-react';
import { useAgentChat } from '@/hooks/useAgentChat';
import type { AgentRole } from '@/lib/types/agents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AgentChatProps {
  agentRole?: AgentRole;
  useOrchestrator?: boolean;
  className?: string;
}

const agentNames: Record<AgentRole, string> = {
  project_manager: 'Project Manager',
  uxui: 'UX/UI Designer',
  fullstack: 'Fullstack Dev',
  security: 'Security Analyst',
  docs: 'Documentation',
  testing: 'Testing Engineer',
  optimization: 'Performance',
  seo: 'SEO Specialist',
  deploy: 'DevOps'
};

const agentColors: Record<AgentRole, string> = {
  project_manager: 'bg-purple-500',
  uxui: 'bg-pink-500',
  fullstack: 'bg-blue-500',
  security: 'bg-red-500',
  docs: 'bg-green-500',
  testing: 'bg-yellow-500',
  optimization: 'bg-orange-500',
  seo: 'bg-indigo-500',
  deploy: 'bg-teal-500'
};

export function AgentChat({
  agentRole,
  useOrchestrator = true,
  className = ''
}: AgentChatProps) {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, sendMessage, clearMessages, workPlan } = useAgentChat({
    agentRole,
    useOrchestrator
  });

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">
            {useOrchestrator ? 'Project Manager' : agentNames[agentRole || 'fullstack']}
          </h3>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearMessages}
          disabled={messages.length === 0}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Work Plan Preview */}
      {workPlan && workPlan.subtasks && (
        <div className="p-3 border-b bg-muted/50">
          <div className="text-xs font-medium mb-2">Plan de Trabajo:</div>
          <div className="space-y-1">
            {workPlan.subtasks.slice(0, 3).map((subtask: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <Badge
                  variant={
                    subtask.status === 'completed'
                      ? 'default'
                      : subtask.status === 'in_progress'
                      ? 'secondary'
                      : 'outline'
                  }
                  className="text-[10px] px-1.5 py-0"
                >
                  {subtask.assignedTo}
                </Badge>
                <span className="truncate">{subtask.description}</span>
              </div>
            ))}
            {workPlan.subtasks.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{workPlan.subtasks.length - 3} más...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm">
                {useOrchestrator
                  ? '¿Qué proyecto quieres crear?'
                  : 'Escribe un mensaje para comenzar'}
              </p>
            </div>
          )}

          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role !== 'user' && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.agentId
                      ? agentColors[message.agentId]
                      : 'bg-gray-500'
                  }`}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.role === 'system'
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-muted'
                }`}
              >
                {message.agentId && message.role === 'assistant' && (
                  <div className="text-xs font-medium mb-1 opacity-70">
                    {agentNames[message.agentId]}
                  </div>
                )}

                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>

                {message.deliverables && message.deliverables.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <div className="text-xs opacity-70 mb-1">Entregables:</div>
                    <div className="flex flex-wrap gap-1">
                      {message.deliverables.map((d: any, i: number) => (
                        <Badge key={i} variant="outline" className="text-[10px]">
                          {d.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
