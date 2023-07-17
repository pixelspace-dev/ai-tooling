import "reactflow/dist/style.css";
import KeyNode from "./KeyNode.jsx";
import "./key-node.css";
import HumanInputNode from "./HumanInputNode.jsx";
import "./human-input-node.css";
import AiResponseNode from "./AiResponseNode.jsx";
import "./ai-response-node.css";

const nodeTypes = {
  humanInput: HumanInputNode,
  aiResponse: AiResponseNode,
  keyInput: KeyNode,
};

const initialNodes = [
  {
    id: "0",
    position: { x: 203, y: 10 },
    data: { value: 123 },
    type: "keyInput",
    draggable: false,
  },
  {
    id: "1",
    position: { x: 210, y: 100 },
    data: { value: 123 },
    type: "humanInput",
    draggable: false,
  },
];

export { nodeTypes };
export default initialNodes;
