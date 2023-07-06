import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeToolbar
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 700, y: 100 }, data: { label: 'Human Input' }, type: 'input', style: {backgroundColor: '#9e334a', color: 'white'} },
  { id: '2', position: { x: 700, y: 200 }, data: { label: 'AI Response' }, type: 'output', style: { backgroundColor: '#3a5c4e', color: 'white' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#9e334a';
    case 'output':
      return '#3a5c4e';
    default:
      return '#616161';
  }
};


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor}/>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}