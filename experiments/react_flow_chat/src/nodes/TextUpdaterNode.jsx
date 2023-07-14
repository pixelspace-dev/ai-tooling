import { useCallback } from "react";
import { useReactFlow, Handle, Position, MarkerType } from "reactflow";
import OpenaiCall from "../openaiCall.jsx"
// This node accepts text input from the user, which will be sent to openai

function TextUpdaterNode({ data, isConnectable }) {
  let buttonClicked;
  const onChange = useCallback((evt) => {
    const message = evt.target.value;
    console.log(evt.target.value);
    localStorage.setItem('message', message)
  }, []);

  const reactFlowInstance = useReactFlow();
  let nodeId = 4;
  let xLocation = 110;
  let yLocation = 250;
  
  const handleOpenAiCall = async (message) => {
    await OpenaiCall()
    const openAiResponse = localStorage.getItem('openAiResponse')
    const openAiResponseParsed = JSON.parse(openAiResponse)
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: xLocation,
        y: yLocation,
      },
      data: {
        label: "AI Response:" + message,
        response: openAiResponseParsed,
      },
      
      type: "aiResponse",
      
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
    reactFlowInstance.addEdges(newEdge);
    //end create new node
  }

  const onClick = useCallback(() => {
    //create new node
    const message = localStorage.getItem('message')
    if(!message || !message.length) return
    console.log("node created");
    buttonClicked = true;
    handleOpenAiCall(message)
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
      />
      {buttonClicked}
      <div>
        <label htmlFor="text">Human Input:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />

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

export default TextUpdaterNode;
