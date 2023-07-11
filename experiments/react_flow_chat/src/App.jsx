import React, { useCallback, useState, useEffect, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  addEdge,
  MarkerType,
  applyEdgeChanges, 
  applyNodeChanges
} from 'reactflow';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import 'reactflow/dist/style.css';
import KeyNode, { openaiKey } from './KeyNode.jsx';
import './key-node.css';
import TextUpdaterNode, {message} from './TextUpdaterNode.jsx';
import './text-updater-node.css';
import AiResponseNode from './AiResponseNode.jsx';
import './ai-response-node.css';
import sendMessage from './SendMessage.jsx';


const initialNodes = [
  { id: '0', position: { x: 500, y: 112 }, data: { value: 123 }, type: 'keyInput', draggable: false},
  { id: '1', position: { x: 700, y: 100 }, data: { value: 123 }, type: 'textUpdater', draggable: false},
  { id: '2', position: { x: 700, y: 230 }, data: { label: 'AI Response' }, type: 'aiResponse'},
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', style: { strokeWidth: 2, stroke: '#17171a' }, 
  markerEnd: {type: MarkerType.ArrowClosed, color: '#17171a',}
  ,},
  {id: 'e0-1', source: '0', target: '1', style: { strokeWidth: 2, stroke: '#17171a' }, 
  markerEnd: {type: MarkerType.ArrowClosed, color: '#17171a',} 
  }];

const nodeTypes = { textUpdater: TextUpdaterNode, aiResponse: AiResponseNode, keyInput: KeyNode };
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
  const yPos = useRef(230);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
  useEffect(() => {
    if (openaiKey.length != 51) return;

    async function sendText( message ) {
      const chat = new ChatOpenAI({openAIApiKey: openaiKey, temperature: .9});

      response = await chat.call([
        new HumanMessage(
          message
        ),
      ]);
      let content = response.content;
      console.log(content)
    return content
    }
    var response = sendText(message)
    console.log(response)

    yPos.current += 50;
    setNodes((nodes) => {
      console.log(nodes);
      return [
        ...nodes,
        {
          id: Math.random(), position: { x: 100, y: yPos.current }, data: { label: 'AI Response' }, type: 'aiResponse',
        }
      ];
    });
    //AiResponseNode(response)

  }, [openaiKey]);

  // put response into its own node that appears when a button is pressed
  //   let nodeId = 4;
  // function Flow() {
  //   const reactFlowInstance = useReactFlow();
  //   const onClick = useCallback(() => {
  //     const id = ++nodeId;
  //     const newNode = {
  //       id,
  //       position: {
  //         x: Math.random() * 500,
  //         y: Math.random() * 500,
  //       },
  //       data: {
  //         label: `Node ${id}`,
  //       },
  //     };
  //     reactFlowInstance.addNodes(newNode);
  //   }, []);
    
  //    return (
  //      <>
  //        <ReactFlow
  //         onNodesChange={onNodesChange}
  //         onEdgesChange={onEdgesChange}
  //         onConnect={onConnect}
  //         nodeTypes={nodeTypes}
  //         fitView
  //         style={{
  //           backgroundColor: '#D3D2E5',
  //         }}
  //       />
  //       <Controls />
  //       <MiniMap nodeColor={nodeColor}/>
  //       <Background variant="dots" gap={12} size={1} /> 
        
  //       <button onClick={onClick} className="btn-add">
  //         add node
  //       </button>
  //     </>
  //   );
  // }

  
return (
    
  <div style={{ width: '100vw', height: '100vh'}}>
    {/* <button onClick={addNode}>Add</button> */}
    
    {/* <button onClick={onClick} className="btn-add"></button> */}
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
      
      {/* <ReactFlowProvider>
      <Flow />
      </ReactFlowProvider> */}
      </ReactFlow >

    {/* <button onClick={addNode}>Add</button> */}
    
  </div>
);
}