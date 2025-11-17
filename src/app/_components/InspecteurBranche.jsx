import { RemoveEdgesAction } from "../_actions/edgesAction";


const InspecteurBranche = ({ selection }) => {
    return (
        <>
        <button
          className="mt-2 bg-red-500 px-2 rounded"
          onClick={() => RemoveEdgesAction(selection.edge.id)}
          >
          Supprimer une branche
        </button>
        </>
    );
}

export default InspecteurBranche;