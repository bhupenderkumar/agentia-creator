import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AgentConfigProps {
  onSave: (config: { name: string; type: string }) => void;
}

export const AgentConfig: React.FC<AgentConfigProps> = ({ onSave }) => {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("assistant");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, type });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Agent Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter agent name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Agent Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded-md bg-background border border-input"
            >
              <option value="assistant">Assistant</option>
              <option value="user-proxy">User Proxy</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Create Agent
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};