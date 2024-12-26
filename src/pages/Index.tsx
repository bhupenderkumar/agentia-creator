import React from 'react';
import { AgentConfig } from '@/components/AgentConfig';
import { ChatInterface } from '@/components/ChatInterface';
import { AgentStatus } from '@/components/AgentStatus';
import { AgentFlow } from '@/components/AgentFlow';
import { toast } from '@/components/ui/use-toast';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
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

  const handleCreateAgent = (config: { name: string; type: string; description: string }) => {
    const newAgent: Agent = {
      id: Math.random().toString(36).substr(2, 9),
      name: config.name,
      type: config.type,
      description: config.description,
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
        <ResizablePanelGroup direction="horizontal" className="min-h-[800px] rounded-lg border">
          <ResizablePanel defaultSize={25}>
            <div className="h-full p-4 space-y-4">
              <AgentConfig onSave={handleCreateAgent} />
              <AgentStatus agents={agents} />
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={75}>
            <div className="h-full p-4 space-y-4">
              <AgentFlow agents={agents} />
              <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;