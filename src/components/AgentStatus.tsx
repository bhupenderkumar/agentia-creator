import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: "active" | "idle" | "error";
}

interface AgentStatusProps {
  agents: Agent[];
}

export const AgentStatus: React.FC<AgentStatusProps> = ({ agents }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/5"
            >
              <div>
                <div className="font-semibold">{agent.name}</div>
                <div className="text-sm text-gray-500">{agent.type}</div>
              </div>
              <Badge
                variant={
                  agent.status === "active"
                    ? "default"
                    : agent.status === "idle"
                    ? "secondary"
                    : "destructive"
                }
              >
                {agent.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};