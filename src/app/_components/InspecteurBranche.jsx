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

  const getNodeLabelById = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return "Inconnu";

    try {
      const parsed =
        typeof node.data === "string" ? JSON.parse(node.data) : node.data;
      return parsed?.label ?? "Sans titre";
    } catch {
      return "Erreur parsing";
    }
  };

  const sourceLabel = getNodeLabelById(selection.edge.source);
  const targetLabel = getNodeLabelById(selection.edge.target);

  return (
    <>
      <div className="inspecteur-branche">
        <form action={updateLocalBranch}>
          <h1>Modifier une branche</h1>

          {/* INFO SOURCE / TARGET */}
          {/* <div>
            <p>
              <strong>Source :</strong> {sourceLabel}
            </p>
            <p>
              <strong>Target :</strong> {targetLabel}
            </p>
          </div> */}

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
