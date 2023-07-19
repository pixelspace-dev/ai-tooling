import {
  Handle,
  Position,
  useReactFlow,
  MarkerType,
  useNodeId,
} from "reactflow";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { arrowColor } from "../InitialEdges.jsx";
import defineAttributes from "../nodeAttributes.jsx";

// This node prints the AI response

function AiResponseNode({ data, isConnectable }) {
  const reactFlowInstance = useReactFlow();
  const currentId = useNodeId();

  const nodeArray = JSON.parse(localStorage.getItem("nodeArray"));
  let currentNode = nodeArray.find(({ id }) => id == currentId);

  let xLocation = currentNode.xVal - 100;
  let yLocation = currentNode.yVal + 140 + currentNode.content.length;

  const onClick = useCallback(() => {
    //create new node
    const id = uuidv4();

    const newNode = {
      id,
      position: {
        x: xLocation,
        y: yLocation,
      },
      data: {
        label: "Human Input:",
      },
      type: "humanInput",
    };

    const newEdge = [
      {
        id,
        source: currentId,
        target: id,
        style: { strokeWidth: 2, stroke: arrowColor },
        markerEnd: { type: MarkerType.ArrowClosed, color: arrowColor },
      },
    ];
    defineAttributes(id, xLocation, yLocation, "human input");
    xLocation = xLocation + 180;
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
    console.log("human input node created");
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
