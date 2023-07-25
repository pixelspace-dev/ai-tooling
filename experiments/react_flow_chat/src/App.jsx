import React from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Flow from "./nodeTree.jsx";
import ClearButton from "./components/ClearButton.jsx";
import "./components/clear-button.css";
import SelectModel from "./components/SelectModel.jsx";
import "./components/select-model.css";
import PixyFlowTitle from "./components/PixyFlowTitle.jsx";

export default function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "11vh",
          backgroundColor: "#161618",
          border: "none",
        }}
      >
        <PixyFlowTitle />
        <ClearButton />
        <SelectModel />
      </div>
      <div
        style={{ width: "100vw", height: "89vh", backgroundColor: "#161618"}}
      >
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </>
  );
}
