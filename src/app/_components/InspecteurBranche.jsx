import { startTransition } from "react";
import { RemoveEdgesAction } from "../_actions/edgesAction";
import { useGrid } from "../_contexts/gridContext";


const InspecteurBranche = ({ selection, setHandler }) => {

  const {
    edges,
  } = useGrid();

  const deleteLocalBranch = async (edgeId) => {
    setHandler(edges.filter((edge) => edge.id !== edgeId));

    startTransition(async () => {
      await RemoveEdgesAction(edgeId);
    });
  }

  const updateLocalBranch = async (formData) => {
    console.log("FORM DATA BRANCH", formData);
  }

    return (
        <>
        <button
          className="mt-2 bg-red-500 px-2 rounded"
          onClick={() => deleteLocalBranch(selection.edge.id)}
          >
          Supprimer une branche
        </button>
        <form action={updateLocalBranch}>
          <h1>Inspecteur Branche</h1>
          <button
            type="submit"
            className="w-full p-2 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Mettre à jour la branche
          </button>
        </form>
        </>
    );
}

export default InspecteurBranche;