import { useCallback} from "react";
import ReactFlow, {
  useReactFlow,
  MiniMap,
  Controls,
} from "reactflow";
import initialNodes, { nodeTypes } from "./nodes/InitialNodes";
import initialEdges from "./InitialEdges";
import "./button.css";


function Flow() {

  const nodeColor = (node) => {
    switch (node.type) {
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
    </>
  );
}

export default Flow;
