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
      <h1 className="inspecteur-title">
        Construction de l’histoire
      </h1>
      <button
        className={`btn-primary ${
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
        Ajouter un noeud Début (à supprimer)
      </button>
      <button
        className="btn-secondary"
        onClick={() =>
          addNode({
            id: uuidv4(),
            position: {
              x: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
              y: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
            },
            data: {
              label: "Titre de l'événement", // TITRE
              type: "Histoire",
            },
          })
        }
      >
        Ajouter un événement
      </button>
      <button
        className="btn-secondary"
        onClick={() =>
          addNode({
            id: uuidv4(),
            position: {
              x: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
              y: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
            },
            data: {
              label: "Fin", // TITRE
              type: "Fin",
            },
          })
        }
      >
        Ajouter une fin
      </button>

      <h1 className="inspecteur-title personnalisation">Personnalisation</h1>
      <div className="btn-personnalisation">
        <button className="btn-secondary">Ambiance</button>
        <button className="btn-secondary">Animation</button>
        <button className="btn-secondary">Image</button>
      </div>
    </div>
  );
};

export default InspecteurBase;
