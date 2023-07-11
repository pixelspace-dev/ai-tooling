import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
// This node accepts text input from the user, which will be sent to openai

var message

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    message = evt.target.value
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} id="a" isConnectable={isConnectable} />
      
      <div>
        <label htmlFor="text">Human Input:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      
        <button onClick={() => {
          console.log("Button Clicked");
        }}>Submit</button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}
export {message};
export default TextUpdaterNode;