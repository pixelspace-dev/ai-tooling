import {  MarkerType,} from "reactflow";

const arrowColor = "#825184"

const initialEdges = [
    {
      id: "e0-1",
      source: "0",
      target: "1",
      style: { strokeWidth: 2, stroke: arrowColor },
      markerEnd: { type: MarkerType.ArrowClosed, color: arrowColor },
    },
  ];

export {arrowColor}
export default initialEdges