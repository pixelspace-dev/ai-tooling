import { useCallback } from "react";
import { useReactFlow, Handle, Position, MarkerType, useNodeId } from "reactflow";
import OpenaiCall from "../openaiCall.jsx"
import { v4 as uuidv4 } from 'uuid';
import { arrowColor } from "../InitialEdges.jsx";
import defineAttributes from "../nodeAttributes.jsx";
import updatePastHistory from "../updatePastHistory.jsx";
// This node accepts text input from the user, which will be sent to openai

function HumanInputNode({ data, isConnectable }) {

  const onChange = useCallback((evt) => {
    const message = evt.target.value;
    //console.log(evt.target.value);
    localStorage.setItem('message', message)
  }, []);

  const reactFlowInstance = useReactFlow();

  const currentId = useNodeId();
  // access the current node object from the node array
  // this allows new x and y values to be built from current values
  const nodeArray = JSON.parse(localStorage.getItem('nodeArray'))
  let currentNode = nodeArray.find(({id}) => id == currentId);

  let xLocation = currentNode.xVal - 100
  let yLocation = currentNode.yVal + 200
  
  const handleOpenAiCall = async (message) => {
    const id = uuidv4();

    updatePastHistory(currentNode.previousResponseID, id, true)

    await OpenaiCall(currentNode.previousResponseID)
    const openAiResponse = JSON.parse(localStorage.getItem('openAiResponse'))
    const newNode = {
      id,
      position: {
        x: xLocation,
        y: yLocation,
      },
      data: {
        label: "AI Response:",
        response: openAiResponse,
      },
      
      type: "aiResponse",
      
    };
    const newEdge = [
      {
        id,
        source: currentId,
        target: id,
        label: message,
        style: { strokeWidth: 2, stroke: arrowColor },
        markerEnd: { type: MarkerType.ArrowClosed, color: arrowColor },
        type: "custom",
        data: {label: "User: " + message}
      },
    ];
    defineAttributes(id, xLocation, yLocation, openAiResponse);
    xLocation = xLocation + 180;
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
    //end create new node
  }

  const onClick = useCallback(() => {
    //create new node
    const message = localStorage.getItem('message')
    if(!message || !message.length) return
    console.log("node created");
    handleOpenAiCall(message)
  }, []);

  return (
    <div className="human-input-node">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Human Input:</label>
        <textarea id="text-area" name="text" onChange={onChange} className="nodrag" />

        <button onClick={onClick}>add node</button>
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

export default HumanInputNode;
