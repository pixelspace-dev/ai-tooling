import React, { useState } from "react";

export default function SelectModel() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  sessionStorage.setItem("model", selectedModel);

  return (
    <select
      value={selectedModel}
      onChange={(e) => setSelectedModel(e.target.value)}
      className="select-model"
    >
      <option className="option-select" value={"gpt-4"}>gpt-4</option>
      <option className="option-select" value={"gpt-3.5-turbo-16k"}>gpt-3.5</option>
    </select>
  );
}


