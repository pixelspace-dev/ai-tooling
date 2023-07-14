import React from "react";
import {
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import Flow from "./nodeTree.jsx"
import OpenaiCall from "./openaiCall.jsx"

export default function App() {
  
  OpenaiCall()

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
