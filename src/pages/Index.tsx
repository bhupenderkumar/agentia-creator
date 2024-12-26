import React from 'react';
import { AgentConfig } from '@/components/AgentConfig';
import { ChatInterface } from '@/components/ChatInterface';
import { AgentStatus } from '@/components/AgentStatus';
import { toast } from '@/components/ui/use-toast';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: "active" | "idle" | "error";
}

interface Message {
  role: string;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleCreateAgent = (config: { name: string; type: string }) => {
    const newAgent: Agent = {
      id: Math.random().toString(36).substr(2, 9),
      name: config.name,
      type: config.type,
      status: "idle",
    };
    setAgents([...agents, newAgent]);
    toast({
      title: "Agent Created",
      description: `${config.name} has been added to your workspace.`,
    });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    // Simulate agent response
    setTimeout(() => {
      const response: Message = {
        role: "assistant",
        content: `I received your message: "${content}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          AI Agent Workspace
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <AgentConfig onSave={handleCreateAgent} />
            <AgentStatus agents={agents} />
          </div>
          <div className="md:col-span-3 h-[800px]">
            <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;