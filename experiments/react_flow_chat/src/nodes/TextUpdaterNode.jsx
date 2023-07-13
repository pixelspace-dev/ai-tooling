import { useCallback } from "react";
import { useReactFlow, Handle, Position, MarkerType } from "reactflow";
// This node accepts text input from the user, which will be sent to openai
var message;
var buttonClicked = false;

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    message = evt.target.value;
    console.log(evt.target.value);
  }, []);
  const reactFlowInstance = useReactFlow();
  let nodeId = 4;
  let xLocation = 110;
  let yLocation = 250;
  const onClick = useCallback(() => {
    //create new node
    console.log("node created");
    buttonClicked = true;

    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: xLocation,
        y: yLocation,
      },
      data: {
        label: "AI Response:" + message,
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
export { message, buttonClicked };
export default TextUpdaterNode;
