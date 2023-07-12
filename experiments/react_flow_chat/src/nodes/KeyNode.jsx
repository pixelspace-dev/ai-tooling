import { useCallback } from "react";
import { Handle, Position } from "reactflow";
// This node is where the user can input the openai key

var openaiKey = "";

function KeyNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    openaiKey = evt.target.value;
  }, []);

  return (
    <div className="key-node">
      <div>
        <label htmlFor="text">Openai Key:</label>
        <input id="key" name="key" onChange={onChange} className="nodrag" />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export { openaiKey };
export default KeyNode;
