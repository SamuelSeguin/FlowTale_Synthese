"use client";
import { createContext, startTransition, useContext, useState } from "react";
import useGridInternals, { SelectionType } from "../_hooks/useGridInternals";
import { addEdge, ReactFlowProvider } from "@xyflow/react";
import { AddNodesAction, UpdateNodesAction } from "../_actions/nodesAction";
import { v4 as uuidv4 } from 'uuid';
import { AddEdgesAction } from "../_actions/edgesAction";

const gridContext = createContext({
  nodes: [],
  edges: [],
  selection: { node: null, edge: null, type: SelectionType.none },
  deselect: () => {},
  updateSelectionData: () => {},
  addLocalNode: (newNode) => {},
  internals: {
    onNodesChange: (changes) => {},
    onEdgesChange: (changes) => {},
    onSelectionChange: ({ nodes, edges }) => {},
    onConnect: (params) => {},
  },
  _v: 0,
});

// Ce contexte/Provider vous donne la base pour accéder aux noeuds et branches de l'application.
// Vous êtes évidemment encouragés à en faire la modification afin de centraliser la manipulation des noeuds/branches
// On y propage aussi des variables/fonctions concernant la sélection en cours (noeud ou branche)
// nodes/edges et internals sont également à utiliser pour les props de la composante ReactFlow

// Les noeuds et branches provenant du serveur sont passer en props à ce Provider sous la forme attendue:
// initialNodes: pour les noeuds, un tableau d'objets contenant ces propriétés au minimum (peut en contenir d'autres également):
//  {id: '', position: {x: 0, y: 0}} // https://reactflow.dev/api-reference/types/node

// initialEdges: pour les brancges, un tableau d'objets contenant ces propriétés au minimum (peut en contenir d'autres également):
//  {id: '', source: '', target: ''} // https://reactflow.dev/api-reference/types/edge

const GridProvider = ({ children, initialNodes = [], initialEdges = [], storyId }) => {
  // States à modifier pour ajouter/supprimer/mettre à jour les noeuds/branches
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Fonction appelée lors d'un déplacement d'un noeud (après 250 ms d'inactivité)
  // Params: un objet contenant le id du noeud ainsi que sa nouvelle position
  // Il ne reste qu'à envoyer sa position à la bd via une action serveur.
  const onUpdateNodePositionHandler = async ({ id, position }) => {
    console.log("[NODE POSITION UPDATE]", id, position);
    // ex:
    // await updateNodePositionAction(node.storyId, node.id, node.position);
    await UpdateNodesAction(id, position);
    console.log("[NODE POSITION UPDATED IN DB]");
  };

  // Fonction appelée quand une branche est ajoutée entre deux noeuds.
  // Il vous faut rendre le id unique et modifier l'objet newEdgeData au besoin.
  // Il faudrait aussi y sauvegarder les données nécessaires via une action serveur.
  const onEdgeCreatedHandler = async ({ source, target }) => {
    console.log("[NEW EDGE CREATED]: Entre:", source, target);
    const newEdgeData = {
      id: uuidv4(),
      source, // le id du noeud de départ
      target, // le id du noeud de fin
      data: { texte: '.', animation: '.' },
      storyId: storyId,
    };

    // ajoute la branche dans le state (addEdge s'occupe de faire une validation)
    setEdges((currentEdges) => addEdge(newEdgeData, currentEdges));

    AddEdgesAction(newEdgeData);
  };

  // useGridInternal gère la mécanique interne déjà préparée
  // selection: informe sur le noeud ou la branche sélectionnée
  // deselect: permet de tout désélectionner
  // updateSelectionData: rafraichissement manuel des données de la sélection à appeler au besoin (si désynchronisé)
  // interals est à utiliser directement avec la composante ReactFlow
  const { selection, deselect, updateSelectionData, internals } =
    useGridInternals(
      nodes,
      setNodes,
      edges,
      setEdges,
      onUpdateNodePositionHandler,
      onEdgeCreatedHandler
    );

  // implémenter/déclarer les manipulations du state à partir d'ici... ou ailleurs
  // ex:
  const addLocalNode = async (newNode) => {
    // ajouter le noeud au state puis ensuite à bd via une action serveur
    try {
      const MaNewNode = {
        id: newNode.id,
        positionX: newNode.position.x,
        positionY: newNode.position.y,
        data: JSON.stringify(newNode.data),
        storyId: storyId,
      }
  
      //LOCAL
      setNodes([...nodes, newNode]);
  
      //SERVEUR
      AddNodesAction(MaNewNode);
      // startTransition(async () => {
      //   const { success } = await AddNodesAction(MaNewNode);
      //   if (!success) {
      //     toast.error("Une erreur est survenue.");
      //     return;
      //   }
      // });
    }
    catch (err) {
      console.log("[ERREUR AJOUT NOEUD]", err);
    }
  };

  return (
    <ReactFlowProvider>
      <gridContext.Provider
        value={{
          nodes,
          edges,
          selection,
          setEdges,
          setNodes,
          deselect,
          updateSelectionData,
          internals,
          addLocalNode,
          _v: 1,
        }}
      >
        {children}
      </gridContext.Provider>
    </ReactFlowProvider>
  );
};

const useGrid = () => {
  const ctx = useContext(gridContext);
  if (ctx._v === 0) {
    console.log("Veuillez utiliser le GridProvider");
  }
  return ctx;
};

export { GridProvider, useGrid };

export default gridContext;
