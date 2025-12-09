import { startTransition } from "react";
import {
  RemoveNodesAction,
  UpdateNodesInfoAction,
} from "../_actions/nodesAction";
import { useGrid } from "../_contexts/gridContext";
import "./ConstructionHistoire.css";

const InspecteurNode = ({ selection, setHandler }) => {
  const { nodes } = useGrid();

  const deleteLocalNode = async (nodeId) => {
    setHandler(nodes.filter((node) => node.id !== nodeId));

    startTransition(async () => {
      await RemoveNodesAction(nodeId);
    });
  };

  const updateLocalNode = async (formData) => {
    console.log("FORM DATA NODE", formData);
    const title = formData.get("title");
    const description = formData.get("description");
    const updatedNodes = {
      ...selection.node,
      data: { ...selection.node.data, label: title, description: description },
    };

    console.log("NODE MISE A JOUR", updatedNodes);
    setHandler(nodes.map((n) => (n.id === updatedNodes.id ? updatedNodes : n)));

    startTransition(async () => {
      await UpdateNodesInfoAction(updatedNodes);
    });
  };

  return (
    <>
      <div className="inspecteur-node">
        <form className="inspecteurs-forms" action={updateLocalNode}>
          <h1 className="inspecteur-title">Modifier un événement</h1>
          <div className="floating-label">
            <input
              type="text"
              name="title"
              className=""
              defaultValue={selection.node.data.label || ""}
            />
            <label>Titre </label>
          </div>
          <div className="floating-label">
            <textarea
              name="description"
              defaultValue={selection.node.data.description || ""}
              required
            />
            <label>Description</label>
          </div>
          <button type="submit" className="btn-primary">
            Mettre à jour l'événement
          </button>
        </form>
        <button
          className="btn-danger"
          onClick={() => deleteLocalNode(selection.node.id)}
        >
          Supprimer un événement
        </button>
      </div>
    </>
  );
};

export default InspecteurNode;
