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
import updatePastHistory from "../updatePastHistory.jsx";

// This node prints the AI response

function AiResponseNode({ data, isConnectable }) {
  const reactFlowInstance = useReactFlow();
  const currentId = useNodeId();

  const nodeArray = JSON.parse(localStorage.getItem("nodeArray"));
  let currentNode = nodeArray.find(({ id }) => id == currentId);

  let xLocation = currentNode.xVal - 100;
  let yLocation = currentNode.yVal + 140 + currentNode.content.length;

  const handlePastHistory = (id) => {
    updatePastHistory(currentId, id, false);
  };

  const onClick = useCallback(() => {
    const id = uuidv4();

    handlePastHistory(id);
    //create new node

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
    defineAttributes(id, xLocation, yLocation, "human input", currentId);
    xLocation = xLocation + 180;
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
    console.log("human input node created");
  }, []);

  const onClickDelete = useCallback(() => {
    reactFlowInstance.setNodes((nds) =>
      nds.filter((node) => node.id !== currentId)
    );
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
        <div className="bottom-line">
          <button onClick={onClick}>new message</button>
        </div>
        <div className="bottom-line">
          <button className="delete-button" onClick={onClickDelete}>x</button>
        </div>
      </div>
    </div>
  );
}

export default AiResponseNode;
