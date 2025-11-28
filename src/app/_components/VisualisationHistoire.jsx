"use client";
import { useState, useEffect } from "react";
import "./VisualisationHistoire.css";
import Link from "next/link";

const VisualisationHistoire = ({ story }) => {

  const [parsedNodes, setParsedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  // --- Fonction qui parse seulement si c'est une string JSON ---
  const safeParse = (value) => {
    if (!value) return {};
    if (typeof value === "object") return value; // déjà un objet OK
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.warn("❌ JSON invalide :", value);
        return {};
      }
    }
    return {};
  };

  useEffect(() => {
    if (!story || !story.nodes) return;

    const nodes = story.nodes.map((node) => ({
      ...node,
      data: safeParse(node.data),                // ⬅ FIX
      outgoingEdges: node.outgoingEdges?.map((edge) => ({
        ...edge,
        data: safeParse(edge.data),              // ⬅ FIX
      })) || [],
    }));

    setParsedNodes(nodes);

    // Recherche du nœud "Début"
    const startNode = nodes.find((n) => n.data?.type === "Début");

    console.log("Nœud de départ trouvé :", startNode);

    if (startNode) setCurrentNode(startNode);
    else console.warn("⚠️ Aucun nœud de type 'Début' trouvé");

  }, [story]);

  if (!currentNode) return <div>Chargement...</div>;

  const outgoing = currentNode.outgoingEdges || [];

  const goToNode = (nodeId) => {
    const next = parsedNodes.find((n) => n.id === nodeId);
    if (next) setCurrentNode(next);
  };

  return (
  <div>
    <div className="histoire-container">

      {/* FIN DE L'HISTOIRE */}
      {outgoing.length === 0 && (
        <>
          <div className="fin-histoire">{currentNode.data?.description}</div>
          <Link href={"/"}>
            Retourner à l'accueil
          </Link>
        </>
      )}

      {/* NODE AVEC UN SEUL CHEMIN → AFFICHER "CONTINUER" */}
      {outgoing.length === 1 && (
        <div>
          <div className="node-content">{currentNode.data?.description}</div>

          <button
            className="choix-btn continuer-btn"
            onClick={() => goToNode(outgoing[0].target)}
          >
            Continuer →
          </button>
        </div>
      )}

      {/* NODE AVEC PLUSIEURS CHOIX */}
      {outgoing.length > 1 && (
        <div>
          <div className="node-content">{currentNode.data?.description}</div>

          <div className="choix-container">
            {outgoing.map((edge) => (
              <button
                key={edge.id}
                className="choix-btn"
                onClick={() => goToNode(edge.target)}
              >
                {edge.data?.texte || "Choisir"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* BOUTON RETOUR */}
    <Link href={`/histoires/${story.id}`}>
    <button className="visualisation-cta-btn">
      <span className="visualisation-cta-arrow left">→</span>
      <span className="visualisation-cta-text">Retour</span>
      <span className="visualisation-cta-arrow right">→</span>
    </button>
    </Link>
  </div>
);
};

export default VisualisationHistoire;
