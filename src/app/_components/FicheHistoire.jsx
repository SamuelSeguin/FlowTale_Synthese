"use client";
import "./FicheHistoire.css";

const FicheHistoire = () => {
  return (
    <div className="fiche-container">
      <div className="fiche-flex">
        <div className="fiche-image"></div>
        <div className="fiche-content">
          <h1 className="fiche-titre">
            Les Brumes d’Éloria (exemple pour mise en page)
          </h1>
          <h2 className="fiche-auteur">Camille Lenoir</h2>
          <p className="fiche-synopsis">
            Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
            entièrement. Lorsque Lira, une jeune cartographe intrépide, découvre
            une carte ancienne révélant l’existence des Portes des Mondes, elle
            se lance dans une quête périlleuse. Entre magie ancestrale,
            créatures énigmatiques et alliances inattendues, Lira doit percer le
            secret des brumes pour sauver Éloria du danger qui grandit dans
            l’ombre.
          </p>
          <button className="fiche-cta-btn">
            <span className="fiche-cta-arrow left">→</span>
            <span className="fiche-cta-text">Visualiser</span>
            <span className="fiche-cta-arrow right">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FicheHistoire;
