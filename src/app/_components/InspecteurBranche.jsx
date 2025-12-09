import { startTransition, useState } from "react";
import { RemoveEdgesAction } from "../_actions/edgesAction";
import { useGrid } from "../_contexts/gridContext";
import { UpdateNodesInfoAction } from "../_actions/nodesAction";
import "./ConstructionHistoire.css";
const InspecteurBranche = ({ selection, setHandler }) => {
  const { edges, nodes } = useGrid();
  const [type, setType] = useState(
    selection.edge.data.typeBranche || "regulier"
  );

  const setBranchType = (newType) => {
    setType(newType);

    const updatedEdge = {
      ...selection.edge,
      data: {
        ...selection.edge.data,
        typeBranche: newType, // "regulier" | "historique" | "conditionnel"
      },
    };

    setHandler(edges.map((e) => (e.id === updatedEdge.id ? updatedEdge : e)));
  };

  const deleteLocalBranch = async (edgeId) => {
    setHandler(edges.filter((edge) => edge.id !== edgeId));

    startTransition(async () => {
      await RemoveEdgesAction(edgeId);
    });
  };

  const updateLocalBranch = async (formData) => {
    console.log("FORM DATA BRANCH", formData);
    const texte = formData.get("texte");
    const updatedEdges = {
      ...selection.edge,
      data: { ...selection.edge.data, texte: texte },
    };
    setHandler(edges.map((e) => (e.id === updatedEdges.id ? updatedEdges : e)));

    startTransition(async () => {
      await UpdateNodesInfoAction(updatedEdges);
    });
  };

  return (
    <>
      <div className="inspecteur-branche">
        <h1 className="inspecteur-title personnalisation">Type de choix</h1>
        <div className="btn-personnalisation-toggle">
          <button
            type="button"
            className={`btn-toggle ${type === "regulier" ? "active" : ""}`}
            onClick={() => setBranchType("regulier")}
          >
            Régulier
          </button>
          <button
            type="button"
            className={`btn-toggle ${type === "historique" ? "active" : ""}`}
            onClick={() => setBranchType("historique")}
          >
            Historique
          </button>
          <button
            type="button"
            className={`btn-toggle ${type === "conditionnel" ? "active" : ""}`}
            onClick={() => setBranchType("conditionnel")}
          >
            Conditionnel
          </button>
        </div>

        {type === "regulier" && (
          <p className="description-branches">
            <strong>Choix régulier :</strong> choix normal, sans historique ni
            condition particulière.
          </p>
        )}
        {type === "historique" && (
          <p className="description-branches">
            <strong>Choix historique :</strong> enregistre ce choix pour s'en
            servir plus tard dans l'histoire.
          </p>
        )}
        {type === "conditionnel" && (
          <p className="description-branches">
            <strong>Choix conditionnel :</strong> ce choix n'est visible que si
            l'utilisateur a déjà déclenché un identifiant historique.
          </p>
        )}
        <form action={updateLocalBranch}>
          <h1 className="inspecteur-title type-branche">Modifier un choix</h1>

          <div className="floating-label">
            <label>Description </label>
            <textarea
              name="texte"
              className=""
              defaultValue={selection.edge.data.texte || ""}
            />
          </div>

          <button type="submit" className="btn-primary">
            Mettre à jour un choix
          </button>
        </form>
        <button
          className="btn-danger"
          onClick={() => deleteLocalBranch(selection.edge.id)}
        >
          Supprimer un choix
        </button>
      </div>
    </>
  );
};

export default InspecteurBranche;
