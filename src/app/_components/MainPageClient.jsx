"use client";
import "@xyflow/react/dist/style.css";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_contexts/gridContext";
import { useEffect } from "react";
import InspecteurNode from "./InspecteurNode";
import InspecteurBranche from "./InspecteurBranche";
import InspecteurBase from "./InspecteurBase";
import "./ConstructionHistoire.css";
import Footer from "../_components/Footer";
import { v4 as uuidv4 } from "uuid";

const MainPageClient = ({ nodeData, storyId }) => {
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
      return <InspecteurBranche selection={selection} setHandler={setEdges} storyId={storyId} />;
    } else <></>;
  };
  
  useEffect(() => {
    console.log("MA SELECTION", selection);
  }, [selection]);
  
  const edgesWithTypeLabel = edges.map((edge) => {
    let label = "";
    
    if (edge.data?.typeBranche === "regulier") label = "R";
    if (edge.data?.typeBranche === "historique") label = "H";
    if (edge.data?.typeBranche === "conditionnel") label = "C";
    
    return {
      ...edge,
      label,
    };
  });
  
  return (
    <div>
      <div className="container-flex">
        <div className="inspecteurs-flex">
          <InspecteurBase addNode={addLocalNode} nodeData={nodeData} />

          {showInspecteur()}
        </div>

        <div className="reactFlow-container">
          <ReactFlow
            nodes={nodes}
            edges={edgesWithTypeLabel}
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
          <div className="btns-construction">
            <button className="btn-save">Sauvegarder</button>
            <button className="btn-publier">Publier</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MainPageClient;
