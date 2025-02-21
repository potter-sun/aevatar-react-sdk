import React, { useRef, useCallback, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./index.css";

import { DnDProvider, useDnD } from "./DnDContext";
import ScanCardNode from "../AevatarItem4Workflow";
import Background from "./background";

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes = [
  {
    id: getId(),
    type: "ScanCard",
    position: {
      x: 100,
      y: 300,
    },
    data: {
      label: "ScanCard Node",
      isNew: true,
    },
  },
];

export const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds) as any),
    []
  );

  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    event => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode =
        type === "new"
          ? {
              id: getId(),
              type: "ScanCard",
              position,
              data: {
                label: "ScanCard Node",
                isNew: true,
              },
            }
          : {
              id: getId(),
              type: "ScanCard",
              position,
              data: {
                label: "ScanCard Node",
                isNew: false,
              },
            };

      setNodes(nds => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );
  const nodeTypes = useMemo(() => ({ ScanCard: ScanCardNode }), []);
  return (
    <div className="dndflow sdk:w-full">
      <div className="reactflow-wrapper sdk:relative" ref={reactFlowWrapper}>
        <ReactFlow
          colorMode="dark"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          {nodes.length === 0 && <Background></Background>}
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
