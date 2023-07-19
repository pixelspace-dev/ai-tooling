import React, { useCallback } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Flow from "./nodeTree.jsx";
import "./button.css";

export default function App() {
  const handleClick = useCallback(() => {
    sessionStorage.clear("chatHistory");
    window.location.reload();

  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" , backgroundColor: "#161618"}}>
      <button onClick={handleClick}>Clear History</button>
      <p></p>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
