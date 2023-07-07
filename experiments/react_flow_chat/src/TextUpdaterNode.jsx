import { useCallback } from 'react';
import { Background, Handle, Panel, Position } from 'reactflow';
import sendText from './test_function.jsx';

const handleStyle = { left: 10 };
var message = "None"
var response

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    message = evt.target.value
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="text">Human Input:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>

      <button onClick={() => {
        console.log("Button Clicked");
        response = sendText("gpt-4", message)
      }}>Submit</button>

      <p>{sendText("gpt-4", message)}</p>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;