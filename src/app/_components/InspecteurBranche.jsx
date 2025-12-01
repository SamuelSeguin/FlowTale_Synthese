import { startTransition } from "react";
import { RemoveEdgesAction } from "../_actions/edgesAction";
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
        <form action={updateLocalBranch}>
          <h1>Modifier une branche</h1>

          <div className="floating-label">
            <label>Description </label>
            <textarea
              name="texte"
              className=""
              defaultValue={selection.edge.data.texte || ""}
            />
          </div>

          <button type="submit" className="btn-inspecteur">
            Mettre à jour la branche
          </button>
        </form>
        <button
          className="btn-supprimer-branche"
          onClick={() => deleteLocalBranch(selection.edge.id)}
        >
          Supprimer une branche
        </button>
      </div>
    </>
  );
};

export default InspecteurBranche;
