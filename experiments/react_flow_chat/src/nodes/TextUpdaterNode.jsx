import { useCallback, useState } from "react";
import { useReactFlow, Handle, Position } from "reactflow";
// This node accepts text input from the user, which will be sent to openai
var message;
var buttonClicked = false

function TextUpdaterNode( {data, isConnectable }) {
 
  const onChange = useCallback((evt) => {
    message = evt.target.value;
    console.log(evt.target.value);
  }, []);

  const onClick = useCallback(() => {
    console.log("submit button clicked")
    buttonClicked = true
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      {buttonClicked}
      <div>
        <label htmlFor="text">Human Input:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />

        <button onClick={onClick}>Submit</button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
export { message, buttonClicked };
export default TextUpdaterNode;
