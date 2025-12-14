import { startTransition } from "react";
import { RemoveEdgesAction, UpdateEdgesAction } from "../_actions/edgesAction";
import { useGrid } from "../_contexts/gridContext";
import { UpdateNodesInfoAction } from "../_actions/nodesAction";
import "./ConstructionHistoire.css";

const InspecteurBranche = ({ selection, setHandler }) => {
  const { edges, nodes } = useGrid();

  const deleteLocalBranch = async (edgeId) => {
    setHandler(edges.filter((edge) => edge.id !== edgeId));

    startTransition(async () => {
      await RemoveEdgesAction(edgeId);
    });
  };

  const updateLocalBranch = async (formData) => {
    console.log("FORM DATA BRANCH", formData);
    const description = formData.get("description");
    const updatedEdges = {
      ...selection.edge,
      data: { ...selection.edge.data, texte: description },
    };
    console.log("EDGES MISE A JOUR", updatedEdges);
    setHandler(edges.map((e) => (e.id === updatedEdges.id ? updatedEdges : e)));

    startTransition(async () => {
      await UpdateEdgesAction(updatedEdges);
    });
  };

  return (
    <>
      <div className="inspecteur-branche">
        <form action={updateLocalBranch}>
          <h1>Modifier un choix</h1>

          <div className="floating-label">
            <label>Description </label>
            <textarea
              name="description"
              className=""
              defaultValue={selection.edge.data.texte || ""}
            />
          </div>

          <button type="submit" className="btn-inspecteur">
            Mettre à jour un choix
          </button>
        </form>
        <button
          className="btn-supprimer-branche"
          onClick={() => deleteLocalBranch(selection.edge.id)}
        >
          Supprimer un choix
        </button>
      </div>
    </>
  );
};

export default InspecteurBranche;
