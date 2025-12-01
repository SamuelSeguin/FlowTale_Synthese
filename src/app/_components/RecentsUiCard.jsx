"use client";
import Link from "next/link";
import "./RecentsUiCard.css";

const RecentsUiCard = ({ story }) => {
  console.log("STORY IN RECENTSUICARD COMPONENT", story);
  return (
    <section className="recents-section">
      <h1 className="recents-section-title">Créations du moment</h1>
      <div className="recents-grid">
        {story.map(
          (histoire) => (
            console.log("HISTOIRE DANS RECENTSUICARD :", histoire),
            (
              <div className="card-container" key={histoire.id}>
                <Link href={`/histoires/${histoire.id}`}>
                  <img
                    className="recents-img"
                    src="../../../jpg/horreur1.jpg"
                    alt=""
                  />
                </Link>
                <h1 className="recents-title">{histoire.titre}</h1>
                <Link href={`/compte/${histoire?.auteurId}`}>
                  <p className="recents-author">{histoire.auteurName}</p>
                </Link>
                <div className="genre-bg">
                  <p className="genre">{histoire.ambiance}</p>
                </div>
              </div>
            )
          )
        )}
      </div>
    </section>
  );
};

export default RecentsUiCard;
