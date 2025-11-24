import { startTransition } from "react";
import { RemoveNodesAction, UpdateNodesInfoAction } from "../_actions/nodesAction";
import { useGrid } from "../_context/gridContext";

const InspecteurNode = ({ selection, setHandler }) => {

  const {
    nodes,
  } = useGrid();

  const deleteLocalNode = async (nodeId) => {
    setHandler(nodes.filter((node) => node.id !== nodeId));

    startTransition(async () => {
      await RemoveNodesAction(nodeId);
    });
  }

  const updateLocalNode = async (formData) => {
    console.log("FORM DATA NODE", formData);
    const title = formData.get("title");
    const updatedNodes = {...selection.node, data: { ...selection.node.data, label: title } };

    console.log("NODE MISE A JOUR", updatedNodes);
    setHandler(nodes.map((n) => (n.id === updatedNodes.id ? updatedNodes : n)));

    startTransition(async () => {
      await UpdateNodesInfoAction(updatedNodes);
    });
  }

    return (
        <>
         <button
          className="mt-2 bg-red-500 px-2 rounded"
          onClick={() => deleteLocalNode(selection.node.id)}
          >
          Supprimer un noeud
        </button>
        <form action={updateLocalNode}>
          <h1>Inspecteur Node</h1>
          <div>
            <label>Titre: </label>
            <input 
              type="text" 
              name="title" 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={selection.node.data.label || ''} 
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Mettre à jour le noeud
          </button>
        </form>
        </>
    );
}

export default InspecteurNode;