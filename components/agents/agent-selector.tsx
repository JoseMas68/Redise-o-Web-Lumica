/**
 * Agent Selector Component
 * Selector para elegir agentes específicos
 */

'use client';

import { useState } from 'react';
import type { AgentRole } from '@/lib/types/agents';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Palette,
  Code,
  Shield,
  FileText,
  TestTube,
  Gauge,
  Search,
  Rocket
} from 'lucide-react';

interface AgentInfo {
  role: AgentRole;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const agents: AgentInfo[] = [
  {
    role: 'project_manager',
    name: 'Project Manager',
    description: 'Coordina proyectos y asigna tareas',
    icon: <Bot className="w-5 h-5" />,
    color: 'text-purple-500'
  },
  {
    role: 'uxui',
    name: 'UX/UI Designer',
    description: 'Diseña interfaces modernas',
    icon: <Palette className="w-5 h-5" />,
    color: 'text-pink-500'
  },
  {
    role: 'fullstack',
    name: 'Fullstack Developer',
    description: 'Desarrolla componentes y APIs',
    icon: <Code className="w-5 h-5" />,
    color: 'text-blue-500'
  },
  {
    role: 'security',
    name: 'Security Analyst',
    description: 'Audita seguridad',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-red-500'
  },
  {
    role: 'docs',
    name: 'Documentation',
    description: 'Crea documentación técnica',
    icon: <FileText className="w-5 h-5" />,
    color: 'text-green-500'
  },
  {
    role: 'testing',
    name: 'Testing Engineer',
    description: 'Diseña y ejecuta tests',
    icon: <TestTube className="w-5 h-5" />,
    color: 'text-yellow-500'
  },
  {
    role: 'optimization',
    name: 'Performance',
    description: 'Optimiza rendimiento',
    icon: <Gauge className="w-5 h-5" />,
    color: 'text-orange-500'
  },
  {
    role: 'seo',
    name: 'SEO Specialist',
    description: 'Optimiza SEO y contenido',
    icon: <Search className="w-5 h-5" />,
    color: 'text-indigo-500'
  },
  {
    role: 'deploy',
    name: 'DevOps',
    description: 'Gestiona despliegues',
    icon: <Rocket className="w-5 h-5" />,
    color: 'text-teal-500'
  }
];

interface AgentSelectorProps {
  value?: AgentRole;
  onChange?: (value: AgentRole) => void;
  showAll?: boolean;
}

export function AgentSelector({
  value,
  onChange,
  showAll = false
}: AgentSelectorProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole | undefined>(value);

  const handleChange = (newValue: AgentRole) => {
    setSelectedAgent(newValue);
    onChange?.(newValue);
  };

  if (showAll) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <Card
            key={agent.role}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedAgent === agent.role
                ? 'ring-2 ring-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleChange(agent.role)}
          >
            <div className="flex items-start gap-3">
              <div className={agent.color}>{agent.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1">{agent.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {agent.description}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-2 text-[10px] px-1.5 py-0"
                >
                  {agent.role}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Select value={selectedAgent} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un agente" />
      </SelectTrigger>
      <SelectContent>
        {agents.map(agent => (
          <SelectItem key={agent.role} value={agent.role}>
            <div className="flex items-center gap-2">
              <span className={agent.color}>{agent.icon}</span>
              <span>{agent.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
