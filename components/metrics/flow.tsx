"use client";

import {
  Background,
  Controls,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatedSVGEdge } from "./animatedSVGEdge";
import { IRoverMetrics } from "@/interfaces/metrics.interface";

type Props = {
  data: IRoverMetrics;
};

const FlowDiagram = ({ data }: Props) => {
  console.log("🚀 ~ FlowDiagram ~ data:", data);
  const initBgColor = "#c9f1dd";

  const initialEdges = [
    { id: "e1-2a", source: "1", target: "2", animated: true },
    { id: "e1-2b", source: "2", target: "1", animated: true },

    { id: "e2-3a", source: "2", target: "3", animated: true },
    { id: "e2-3b", source: "3", target: "2", animated: true },

    { id: "e2-4a", source: "2", target: "4", animated: true },
    { id: "e2-4b", source: "4", target: "2", animated: true },
  ];

  // Nodes array: Define 6 nodes with placeholder icons
  const initialNodes = [
    {
      id: "1",
      position: { x: 50, y: 100 },
      data: { label: "Rover", color: initBgColor },
      type: "default",
      sourcePosition: Position.Top,
      targetPosition: Position.Right,
    },
    {
      id: "2",
      position: { x: 250, y: -50 },
      data: { label: "Main Server" },
      type: "default",
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: "3",
      position: { x: 450, y: 100 },
      data: { label: "Image Processing Server" },
      type: "default",
      sourcePosition: Position.Top,
      targetPosition: Position.Left,
    },
    {
      id: "4",
      position: { x: 650, y: 50 },
      data: { label: "Database" },
      type: "default",
      sourcePosition: Position.Top,
      targetPosition: Position.Left,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //   const nodeTypes = { custom: CustomNode };

  const edgeTypes = {
    animatedSvg: AnimatedSVGEdge,
  };

  return (
    <div
      style={{
        width: "70vw",
        height: "70vh",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        fitView={true}
        style={{ backgroundColor: "#F7F9FB", borderRadius: "10px" }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
