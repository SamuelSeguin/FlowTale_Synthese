import { v4 as uuidv4 } from "uuid";
import "./ConstructionHistoire.css";

const InspecteurBase = ({ addNode, nodeData }) => {
  const nodeTypes = nodeData?.map((n) => {
    try {
      const parsed = typeof n.data === "string" ? JSON.parse(n.data) : n.data;
      return parsed?.type;
    } catch {
      return null;
    }
  });

  const alreadyHasStartNode = nodeTypes?.includes("Début");

  return (
    <div className="inspecteur-base">
      <button
        className={`btn-ajouter-debut ${
          alreadyHasStartNode ? "btn-ajouter-debut--disabled" : ""
        }`}
        disabled={alreadyHasStartNode}
        onClick={() =>
          addNode({
            id: uuidv4(),
            position: {
              x: Math.floor(Math.random() * 101),
              y: Math.floor(Math.random() * 101),
            },
            data: { label: "Début", type: "Début" },
          })
        }
      >
        Ajouter un noeud Début
      </button>
      <button
        className="btn-ajouter"
        onClick={() =>
          addNode({
            id: uuidv4(),
            position: {
              x: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
              y: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
            },
            data: {
              label: "Noeux d'histoire", // TITRE
              type: "Histoire",
            },
          })
        }
      >
        Ajouter un noeud d'histoire
      </button>
      <button
        className="btn-ajouter-fin"
        onClick={() =>
          addNode({
            id: uuidv4(),
            position: {
              x: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
              y: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
            },
            data: {
              label: "Fin de l'histoire", // TITRE
              type: "Fin",
            },
          })
        }
      >
        Ajouter un noeud Fin
      </button>
    </div>
  );
};

export default InspecteurBase;
