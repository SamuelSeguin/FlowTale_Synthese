"use client";
import "./VisualisationHistoire.css";

const VisualisationHistoire = () => {
  return (
    <div>
      <div className="histoire-container">
        Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
        entièrement. Lorsque Lira, une jeune cartographe intrépide, découvre une
        carte ancienne révélant l’existence des Portes des Mondes, elle se lance
        dans une quête périlleuse. Entre magie ancestrale, créatures
        énigmatiques et alliances inattendues, Lira doit percer le secret des
        brumes pour sauver Éloria du danger qui grandit dans l’ombre.
      </div>
      <button className="visualisation-cta-btn">
        <span className="visualisation-cta-arrow left">→</span>
        <span className="visualisation-cta-text">Retour</span>
        <span className="visualisation-cta-arrow right">→</span>
      </button>
    </div>
  );
};

export default VisualisationHistoire;
