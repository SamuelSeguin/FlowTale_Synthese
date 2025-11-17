import { RemoveNodesAction } from "../_actions/nodesAction";

const InspecteurNode = ({ selection }) => {
    return (
        <>
         <button
          className="mt-2 bg-red-500 px-2 rounded"
          onClick={() => RemoveNodesAction(selection.node.id)}
          >
          Supprimer un noeud
        </button>
        <form action={""}>
          <label>Titre: </label>
          <input type="text" name="title" defaultValue={selection.node.data.label || ''} />
        </form>
        </>
    );
}

export default InspecteurNode;