import ReactFlow, {
  MiniMap,
  Controls,
} from "reactflow";
import initialNodes, { nodeTypes} from "./nodes/InitialNodes";
import initialEdges, {edgeTypes} from "./InitialEdges";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";

function Flow() {


  let nodeArray = [{
    "id" : 1,
    "xVal" : 210,
    "yVal" : 100
  },]
  let stringArray = JSON.stringify(nodeArray)
  localStorage.setItem('nodeArray', stringArray)

  const pastMessages = [
    new HumanMessage("You are a friendly chatbot"),
    new AIMessage("Okay, let's chat."),
  ]
  let pastMessagesString = JSON.stringify(pastMessages)
  sessionStorage.setItem('pastMessages', pastMessagesString)

  const nodeColor = (node) => {
    switch (node.type) {
      case "aiResponse":
        return "#424284";
      case "humanInput":
        return "#373753";
      case "keyInput":
        return "#463781";
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
        edgeTypes={edgeTypes}
        style={{
          backgroundColor: "#161618",
        }}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </>
  );
}

export default Flow;
