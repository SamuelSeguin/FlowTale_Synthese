'use client'
const STORAGE_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY ?? 'web5_synthese_storage';

// Veuillez importer et utiliser HistoryProvider afin d'englober toutes les pages qui devront avoir accès aux fonctionnalités
// impliquant la sauvegarde/récupération/réinitialisation du progrès de l'utilisateur, la sauvegarde/récupération des clés d'historique.
// Le progrès et l'historique de l'utilisateur sont sauvegardés dans un contexte et synchronisés avec le localStorage sous la clé STORAGE_KEY (ci-haut)

// On importe/utilise ensuite le hook useHistory() afin de récupérer les fonctions nécessaires:
// ex: const {setStoryProgress, getHistoryKey} = useHistory();

// Mutations
// setStoryProgress = (storyId: number, nodeId: string) => void;
    // Permet de sauvegarder la node visitée pour une histoire donnée
    // ex: setStoryProgress(2,  '7a131f3a-666a-45d9-9237-a4d6be0d0cfa');
// resetStoryProgress = (storyId: number) => void;
    // Supprime la node visitée et les clés d'historique sauvegardées
    // ex: resetStoryProgress(2);
// unlockHistoryKey = (storyId: number, key: string) => void;
    // Permet de sauvegarder une clé d'historique
    // ex: unlockHistoryProgress(2, 'clé');

// Queries
// getStoryProgress = (storyId: number) => string | null;
    // Retourne le id de la node sauvegardée ou null si aucun nodeId n'a été sauvegardé
    // ex: const lastSavedNodeId = getStoryProgress(2);
// getHistoryKey = (storyId: number, key: string) => boolean;
    // Retourne true si la clé d'historique a été déverrouillée par l'utilisateur
    // ex: const isKeyInInventory = getHistoryKey(2, 'clé');


import React, { useContext, useEffect, useRef, useState } from "react";

const historyContext = React.createContext({
    setStoryProgress:(storyId, nodeId) => {},
    unlockHistoryKey:(storyId, key) => {},
    resetStoryProgress:(storyId) => {},
    // queries
    getStoryProgress:(storyId) => {},
    getHistoryKey:(storyId, key) => {},
    _v: 0
});

export const HistoryProvider = ({children}) => {
    const storageRef = useRef();
    const [tick, setTick] = useState(0);

    // init
    useEffect(() => {
        checkStorage();        
    }, []);

    // sync
    useEffect(() => {
        if (storageRef.current) {            
            localStorage.setItem(STORAGE_KEY, serializeStorage());
        }
    }, [storageRef.current, tick])

    // private
    const incrementTick = () => setTick(current => current + 1);
    
    const serializeStorage = () => {
      try {
        if (!storageRef.current) {
            return '';
        }
        return JSON.stringify(storageRef.current, JSONReplacer);
      } catch(err){
        console.log('[HISTORY CONTEXT SERIALIZING ERROR]', err);
      }
    };

    const checkStorage = () => {
        if (storageRef.current) {
            return;
        }
        storageRef.current = retrieveFromStorage();         
    };

    const retrieveFromStorage = () => {
        try {
            const savedMap = localStorage.getItem(STORAGE_KEY);
            if (!savedMap) {
                throw new Error('Set not found');
            }
            const map = JSON.parse(savedMap, JSONReviver);
            return map;
        }
        catch {
            return new Map();
        }
    };

    const getStoryData = (storyId) => {
        return storageRef.current.get(storyId) ?? {};
    };

    const setStoryData = (storyId, data) => {
        storageRef.current.set(storyId, {...data});
        incrementTick();
    };

     // mutation
     // Permet de sauvegarder la node visitée pour une histoire donnée
    const setStoryProgress = (storyId, nodeId) => {
        checkStorage();  
        setStoryData(storyId, {...getStoryData(storyId), progress: nodeId});                      
    };

    // Supprime la node visitée et les clés d'historique sauvegardées
    const resetStoryProgress = (storyId) => {             
        checkStorage();                                 
        setStoryData(storyId, {});        
    };

    // Permet de sauvegarder une clé d'historique
    const unlockHistoryKey = (storyId, key) => {
        checkStorage();             
        const data = getStoryData(storyId) ?? {};
        const keys = data?.keys ?? {};
        keys[key] = true;
        setStoryData(storyId, {...data, keys: {...keys}});
    };

    // queries
    // Retourne le id de la node
    const getStoryProgress = (storyId) => {
        checkStorage();             
        try {
            const {progress} = getStoryData(storyId);
            return progress;
        } catch {
            return null;
        }

    };

    // Retourne true si la clé d'historique a été déverrouillée par l'utilisateur
    const getHistoryKey = (storyId, key) => {
        checkStorage();                   
        try {
            const {keys, ...data} = getStoryData(storyId);
            return keys[key] ?? false;
        } catch {            
            return false;
        }
    };


    return (
        <historyContext.Provider value={{
            setStoryProgress,
            getStoryProgress,
            resetStoryProgress,
            unlockHistoryKey,
            getHistoryKey,
            _v: 1
        }}>
            {children}
        </historyContext.Provider>
    );

};


export const useHistory = () => {
    const ctx = useContext(historyContext);
    if (ctx._v === 0) {
        console.log('Veuillez utiliser le HistoryProvider');
    }
    return ctx;
};


// Helpers
const JSONReplacer = (_, value) => {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
};

const JSONReviver = (_, value) => {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
};
