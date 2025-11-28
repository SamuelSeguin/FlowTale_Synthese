"use client";
import Link from "next/link";
import "./FicheHistoire.css";

const FicheHistoire = ({ histoire, user }) => {
  console.log("HISTOIRE DANS FICHE HISTOIRE :", histoire);


  return (
    <div className="fiche-container">
      <div className="fiche-flex">
        <div className="fiche-image"></div>
        <div className="fiche-content">
          <h1 className="fiche-titre">
            {histoire?.titre}
          </h1>
          <h2 className="fiche-auteur">{histoire?.auteurName}</h2>
          <p className="fiche-synopsis">
            {histoire?.synopsis}
          </p>
          
          <Link href={`/histoires/${histoire?.id}/jouer`}>
          <button className="fiche-cta-btn">
            <span className="fiche-cta-arrow left">→</span>
            <span className="fiche-cta-text">Visualiser</span>
            <span className="fiche-cta-arrow right">→</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FicheHistoire;
