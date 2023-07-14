import { useCallback, useState } from "react";
import {
  useReactFlow,
  Handle,
  Position,
  MarkerType,
  useNodeId,
} from "reactflow";
import { v4 as uuidv4 } from 'uuid';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { openaiKey } from "./KeyNode.jsx";
import { arrowColor } from "../InitialEdges.jsx";
// This node accepts text input from the user, which will be sent to openai
var message = "";

function HumanInputNode({ data, isConnectable }) {
  const [response, setResponse] = useState("");

  // set message as text is input
  const onChange = useCallback((evt) => {
    message = evt.target.value;
    console.log(evt.target.value);
  }, []);

  const reactFlowInstance = useReactFlow();
  let xLocation = 170;
  let yLocation = 270; //need better way to define this
  const currentId = useNodeId();

  // create new node when button is clicked
  const onClickCreateNode = useCallback(() => {
    //create new ai response node
    const id = uuidv4(); 

    const newNode = {
      id,
      position: {
        x: xLocation,
        y: yLocation,
      },
      data: {
        label: "AI Response: " + message,
      },
      type: "aiResponse",
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
    xLocation = xLocation + 170;
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
    console.log("ai response node created");
  }, []);

  // send message to openai when button is clicked
  const onClickOpenaiCall = useCallback(() => {
    if (openaiKey.length != 51) return;

    async function sendText(message) {
      //chat call instance
      const chat = new ChatOpenAI({
        openAIApiKey: openaiKey,
        temperature: 0.9,
      });

      // make call to ai
      let aiResponse = await chat.call([new HumanMessage(message)]);
      // set response variable - does not work
      setResponse(aiResponse.content);
      //record response
      console.log(aiResponse.content);
      //can't return a value
    }
    //call ai function - does not get response back
    sendText(message);
  }, [openaiKey]);

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
        <textarea
          id="text-area"
          name="text"
          onChange={onChange}
          className="nodrag"
        />

        <button
          onClick={() => {
            onClickOpenaiCall();
            onClickCreateNode();
          }}
        >
          new response
        </button>
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
export { message };
export default HumanInputNode;
