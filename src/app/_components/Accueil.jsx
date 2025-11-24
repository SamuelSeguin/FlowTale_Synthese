"use client";
import "./Accueil.css";
import RecentsUiCard from "../_components/RecentsUiCard";

const Accueil = () => {
  return (
    <div className="container">
      <div className="header-background">
        <section className="hero">
          <h1 className="heroTitle">
            L’ART DE RACONTER, RÉINVENTÉ.
            <br />
            ICI, LA CRÉATIVITÉ PREND
            <br />
            TOUTES LES FORMES.
          </h1>
          <div className="btn-hero">
            <button className="heroCta">
              <span className="cta-arrow left">→</span>
              <span className="cta-text">Créer</span>
              <span className="cta-arrow right">→</span>
            </button>
          </div>
        </section>
      </div>

      <section className="info">
        <div>
          <em>Créez </em>
          des récits interactifs,
          <em> explorez </em>
          ceux des autres et
          <em> partagez </em>
          vos créations en quelques clics.
        </div>
      </section>
      <RecentsUiCard />
    </div>
  );
};

export default Accueil;
