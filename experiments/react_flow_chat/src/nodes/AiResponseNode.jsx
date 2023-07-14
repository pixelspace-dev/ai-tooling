import { Handle, Position,useReactFlow, MarkerType, useUpdateNodeInternals } from "reactflow";
import { useCallback } from "react";

// This node prints the AI response

function AiResponseNode({ data, response, isConnectable }) {

  const reactFlowInstance = useReactFlow();
  let nodeId = 4444;
  let xLocation = 110;
  let yLocation = 350

  const onClick = useCallback(() => {
    //create new node
    console.log("node created");

    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: xLocation,
        y: yLocation,
      },
      data: {
        label: "Human Input:",
      },
      type: "textUpdater",
    };

    const newEdge = [
      {
        id,
        source: "1",
        target: `${nodeId}`,
        style: { strokeWidth: 2, stroke: "#17171a" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#17171a" },
      },
    ];
    xLocation = xLocation + 170;
    reactFlowInstance.addNodes(newNode);
    //reactFlowInstance.addEdges(newEdge);
    //end create new node
  }, []);

  return (
    <div className="ai-response-node">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">AI Response: </label>
        <p>{data?.response}</p>
        <button onClick={onClick}>new message</button>
      </div>
      
    </div>
  );
}

export default AiResponseNode;
