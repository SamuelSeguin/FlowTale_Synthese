"use client";
import Link from "next/link";
import Footer from "../_components/Footer";
import "./FicheHistoire.css";

const FicheHistoire = ({ histoire, user }) => {
  console.log("HISTOIRE DANS FICHE HISTOIRE :", histoire);

  return (
    <div>
      <div className="fiche-container">
        <div className="fiche-flex">
          <img className="fiche-image" src="../../../jpg/horreur1.jpg" alt="" />
          <div className="fiche-content">
            <h1 className="fiche-titre">{histoire?.titre}</h1>
            <Link href={`/compte/${histoire?.auteurId}`}>
              <h2 className="fiche-auteur">{histoire?.auteurName}</h2>
            </Link>
            <div className="genre-fiche-bg">
              <p className="genre-fiche">{histoire.ambiance}</p>
            </div>
            <p className="fiche-synopsis">{histoire?.synopsis}</p>

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
      <Footer />
    </div>
  );
};

export default FicheHistoire;
