import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  applyEdgeChanges, 
  applyNodeChanges
} from 'reactflow';

import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.jsx';
import './text-updater-node.css';

import AiResponseNode from './AiResponseNode.jsx';
import './ai-response-node.css';

const initialNodes = [
  { id: '1', position: { x: 700, y: 100 }, data: { value: 123 }, type: 'textUpdater', draggable: false},
  { id: '2', position: { x: 700, y: 230 }, data: { label: 'AI Response' }, type: 'aiResponse'},
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', style: { strokeWidth: 2, stroke: '#17171a' }, 
  markerEnd: {type: MarkerType.ArrowClosed, color: '#17171a',}
  ,}];
const nodeTypes = { textUpdater: TextUpdaterNode, aiResponse: AiResponseNode };
const rfStyle = {
  backgroundColor: '#e1e8f2',
};

const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#9e334a';
    case 'aiResponse':
      return '#ad6675';
    case 'textUpdater':
      return '#262530';
    default:
      return '#616161';
  }
};


export default function App() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        style={rfStyle}
        fitView
      >
        <Controls />
        <MiniMap nodeColor={nodeColor}/>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow >
    </div>
  );
}