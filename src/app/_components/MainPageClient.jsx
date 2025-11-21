"use client";
import "@xyflow/react/dist/style.css";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_contexts/gridContext";
import { useEffect } from "react";

const MainPageClient = () => {
  const {
    nodes,
    edges,
    selection,
    addLocalNode,
    internals: { onNodesChange, onEdgesChange, onConnect, onSelectionChange },
  } = useGrid();

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  return (
    <div>
      <h1>Main Page Client</h1>
      <button
        className="mt-2 bg-amber-500 px-2 rounded"
        onClick={() =>
          addLocalNode({ id: "id-quatre", position: { x: 0, y: -30 } })
        }
      >
        Ajouter un noeud
      </button>
      <div style={{ width: 1000, height: 1000 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={onSelectionChange}
          onConnect={onConnect}
          // Multi-sélection désactivée pour simplifier votre travail
          multiSelectionKeyCode={null}
          // Suppression par le clavier désactivée pour simplifier votre travail
          deleteKeyCode={null}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </div>
  );
};
export default MainPageClient;
