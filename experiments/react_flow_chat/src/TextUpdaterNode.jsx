import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import sendText from './test_function.jsx';

var response
var message = ""

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

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}
export {message};
export default TextUpdaterNode;