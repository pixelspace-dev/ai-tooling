import { useCallback, useRef, useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  MiniMap,
  Controls,
} from "reactflow";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import initialNodes, { nodeTypes } from "./nodes/InitialNodes";
import initialEdges from "./InitialEdges";
import "./button.css";
import { openaiKey } from "./nodes/KeyNode.jsx";
import { message, buttonClicked } from "./nodes/TextUpdaterNode.jsx";


function Flow() {

  const reactFlowInstance = useReactFlow();

  //// Send message to ai and get response

  //const [content, setContent] = useState("")

  // send message to ai and get response
  // var result;
  // useEffect(() => {
  //   if (!buttonClicked) return;

  //   async function sendText(message) {
  //     const chat = new ChatOpenAI({
  //       openAIApiKey: openaiKey,
  //       temperature: 0.9,
  //     });

  //     response = await chat.call([new HumanMessage(message)]);
  //     let result = response.content;
  //     console.log("result " + result);
  //     setContent(response.content);
  //     console.log("content" + content)

      //add node

      // return Promise.resolve(content);
    //}
    // var response = sendText(message);
    // response.then((content) => {
    //   result = content;
    // });
    // console.log(result);
  // }, [openaiKey]);
  let nodeId = 4
  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: 210,
        y: 200,
      },
      data: {
        label: `Node ${id}`,
      },
      type: "aiResponse"
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const nodeColor = (node) => {
    switch (node.type) {
      case "group":
        return "#b1aacb";
      case "aiResponse":
        return "#6766ad";
      case "textUpdater":
        return "#262530";
      case "keyInput":
        return "#333341";
      default:
        return "#616161";
    }
  };

  return (
    <>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        style={{
          backgroundColor: "rgb(239, 239, 239)",
        }}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} backgroundColor={"#D3D2E5"} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
      <button onClick={onClick} className="btn-add">
        add node
      </button>
    </>
  );
}

export default Flow;
