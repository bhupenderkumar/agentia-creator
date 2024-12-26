import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AgentNode } from './AgentNode';

const nodeTypes = {
  agentNode: AgentNode,
};

export const AgentFlow = ({ agents }) => {
  const initialNodes = agents.map((agent, index) => ({
    id: agent.id,
    type: 'agentNode',
    position: { x: 250 * index, y: 100 },
    data: { ...agent },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <div className="h-[600px] border border-border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};