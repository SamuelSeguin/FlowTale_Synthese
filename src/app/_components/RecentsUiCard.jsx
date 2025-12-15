"use client";

import Link from "next/link";
import "./RecentsUiCard.css";

/* ===========================================
   Affiche une grille avec les histoires récentes
   =========================================== */
const RecentsUiCard = ({ stories }) => {
  return (
    <section className="recents-section">
      <h1 className="recents-section-title">Créations du moment</h1>

      <div className="recents-grid">
        {stories.map((histoire) => (
          <div className="card-container" key={histoire.id}>
            <Link href={`/histoires/${histoire.id}`}>
              <img className="recents-img" src="/jpg/horreur1.jpg" />
            </Link>

            <h1 className="recents-title">{histoire.titre}</h1>

            <Link href={`/utilisateur/${histoire.auteur}`}>
              <p className="recents-author">{histoire.auteurName}</p>
            </Link>

            <div className="genre-bg">
              <p className="genre">{histoire.ambiance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentsUiCard;
