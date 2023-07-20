import React, { useCallback } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Flow from "./nodeTree.jsx";
import ClearButton from "./components/ClearButton.jsx";
import "./button.css";

export default function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "7.5vh",
          backgroundColor: "#161618",
          border: "none",
        }}
      >
        <ClearButton />
      </div>
      <div
        style={{ width: "100vw", height: "92.5vh", backgroundColor: "#161618" }}
      >
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </>
  );
}
