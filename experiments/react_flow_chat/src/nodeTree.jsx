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
        return "#424284";
      case "textUpdater":
        return "#424284";
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
