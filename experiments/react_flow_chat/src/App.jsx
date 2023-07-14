import React from "react";
import {
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import Flow from "./nodeTree.jsx"

export default function App() {

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
