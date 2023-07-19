import ReactFlow, { MiniMap, Controls } from "reactflow";
import { useCallback } from "react";
import initialNodes, { nodeTypes } from "./nodes/InitialNodes";
import initialEdges, { edgeTypes } from "./InitialEdges";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";

function Flow() {
  let nodeArray = [
    {
      id: 1,
      xVal: 610,
      yVal: 100,
    },
  ];
  let stringArray = JSON.stringify(nodeArray);
  localStorage.setItem("nodeArray", stringArray);

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
          backgroundColor: "#161618"
        }}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </>
  );
}

export default Flow;
