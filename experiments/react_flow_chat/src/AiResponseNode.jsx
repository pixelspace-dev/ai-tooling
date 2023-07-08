import {  Handle, Position } from 'reactflow';
import {response} from './test_function.jsx'


function AiResponseNode({ data, isConnectable }){
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