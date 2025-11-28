"use client";
import "@xyflow/react/dist/style.css";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_contexts/gridContext";
import { useEffect } from "react";
import InspecteurNode from "./InspecteurNode";
import InspecteurBranche from "./InspecteurBranche";
import InspecteurBase from "./InspecteurBase";
import "./ConstructionHistoire.css";

const MainPageClient = ({ nodeData }) => {
  const {
    nodes,
    edges,
    selection,
    addLocalNode,
    setNodes,
    setEdges,
    internals: { onNodesChange, onEdgesChange, onConnect, onSelectionChange },
  } = useGrid();

  const showInspecteur = () => {
    if (selection.type === "node") {
      return <InspecteurNode selection={selection} setHandler={setNodes} />;
    } else if (selection.type === "edge") {
      return <InspecteurBranche selection={selection} setHandler={setEdges} />;
    } else <></>;
  };

  useEffect(() => {
    console.log("MA SELECTION", selection);
  }, [selection]);

  return (
    <div className="container-flex">
      <div className="inspecteurs-flex">
        <InspecteurBase addNode={addLocalNode} nodeData={nodeData} />

        {showInspecteur()}
      </div>

      <div className="reactFlow-container">
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
