import "reactflow/dist/style.css";
import KeyNode from "./KeyNode.jsx";
import "./key-node.css";
import TextUpdaterNode from "./TextUpdaterNode.jsx";
import "./text-updater-node.css";
import AiResponseNode from "./AiResponseNode.jsx";
import "./ai-response-node.css";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  aiResponse: AiResponseNode,
  keyInput: KeyNode,
};

const initialNodes = [
  {
    id: "A",
    position: { x: 10, y: 70 },
    data: { label: null },
    type: "group",
    className: "A",
    draggable: false,
    style: { height: "230px", width: "400px" },
  },
  {
    id: "0",
    position: { x: 20, y: 102 },
    data: { value: 123 },
    type: "keyInput",
    draggable: false,
  },
  {
    id: "1",
    position: { x: 210, y: 90 },
    data: { value: 123 },
    type: "textUpdater",
    draggable: false,
  },
];

export { nodeTypes };
export default initialNodes;
