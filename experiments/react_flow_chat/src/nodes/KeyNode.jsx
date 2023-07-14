import { useCallback } from "react";
import { Handle, Position } from "reactflow";
// This node is where the user can input the openai key

function KeyNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    const openaiKey = evt.target.value;
    localStorage.setItem('openaiKey', openaiKey)
  }, []);

  return (
    <div className="key-node">
      <div>
        <label htmlFor="text">Openai Key:</label>
        <input id="key" name="key" onChange={onChange} className="nodrag" />
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

export default KeyNode;
