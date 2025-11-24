import { v4 as uuidv4 } from 'uuid';
const InspecteurBase = ({ addNode }) => {
    return (
        <button
        className="mt-2 bg-amber-500 px-2 rounded"
        onClick={() =>
          addNode({ 
            id: uuidv4(), 
            position: { 
              x: Math.floor(Math.random() * (100 - 0 + 1)) + 0, 
              y: Math.floor(Math.random() * (100 - 0 + 1)) + 0 
            },
            data: { 
              label: "New Node",
              image: null,
              description: null,
              animations: null,
            },
          })
        }
      >
        Ajouter un noeud
      </button>
    )
}

export default InspecteurBase;