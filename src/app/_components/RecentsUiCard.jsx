"use client";

import Link from "next/link";
import "./RecentsUiCard.css";

const RecentsUiCard = ({ stories }) => {
  console.log("STORY IN RECENTSUICARD COMPONENT", stories);
  return (
    <section className="recents-section">
      <h1 className="recents-section-title">Créations du moment</h1>

      <div className="recents-grid">
        {stories.map((histoire) => histoire.public === 1 ? (
            console.log("HISTOIRE DANS RECENTSUICARD :", histoire),
            (
              <div className="card-container" key={histoire.id}>
                <Link href={`/histoires/${histoire.id}`}>
                  <img
                    className="recents-img"
                    src={histoire.image}
                    alt=""
                  />
                </Link>
                <h1 className="recents-title">{histoire.titre}</h1>
                <Link href={`/utilisateur/${histoire.auteur}`}>
                  <p className="recents-author">{histoire.auteurName}</p>
                </Link>
                <div className="genre-bg">
                  <p className="genre">{histoire.ambiance}</p>
                </div>
              </div>
            )
          ) : null
        )}
      </div>
    </section>
  );
};

export default RecentsUiCard;
