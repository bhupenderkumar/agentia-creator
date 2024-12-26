import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const AgentNode = ({ data }) => {
  return (
    <Card className="w-[300px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">{data.description}</p>
        <div className="mt-2 text-xs bg-secondary/50 p-2 rounded">
          Type: {data.type}
        </div>
      </CardContent>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};