import {  Handle, Position } from 'reactflow';

// This node prints the AI response

function AiResponseNode({ response, isConnectable }){

  return (
    <div className="ai-response-node">
        
      <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">AI Response:</label>
      </div>
      <p>{response}</p>
    </div>
  );
}

export default AiResponseNode;