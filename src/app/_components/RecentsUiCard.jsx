"use client";
import "./RecentsUiCard.css";

const RecentsUiCard = () => {
  return (
    <section className="recents-section">
      <h1 className="recents-section-title">Créations du moment</h1>
      <div className="recents-grid">
        <div className="card-container">
          <div className="recents-img"></div>
          <h1 className="recents-title">Titre de l'histoire</h1>
        </div>
      </div>
    </section>
  );
};

export default RecentsUiCard;
