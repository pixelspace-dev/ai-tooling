import React, { useCallback } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Flow from "./nodeTree.jsx";

export default function App() {
  const handleClick = useCallback(() => {
    sessionStorage.clear("chatHistory");
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={handleClick}>Clear</button>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
