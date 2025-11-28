"use client";
import Link from "next/link";
import "./RecentsUiCard.css";

const RecentsUiCard = ({ story }) => {
  console.log("STORY IN RECENTSUICARD COMPONENT", story);
  return (
    <section className="recents-section">
      <h1 className="recents-section-title">Créations du moment</h1>
      {/* <hr /> */}
      <div className="recents-grid">
        {story.map((histoire) => (
          console.log("HISTOIRE DANS RECENTSUICARD :", histoire),
          <div className="card-container" key={histoire.id}>
            <Link href={`/histoires/${histoire.id}`}>
            <div className="recents-img"></div>
            </Link>
            <h1 className="recents-title">{histoire.titre}</h1>
            <p className="recents-author">{histoire.auteurName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentsUiCard;
