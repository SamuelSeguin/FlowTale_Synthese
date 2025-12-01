"use client";
import "./Accueil.css";
import RecentsUiCard from "../_components/RecentsUiCard";
import Footer from "../_components/Footer";
import Link from "next/link";

const Accueil = ({ story }) => {
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
            <Link href="/creationHistoire">
              <button className="heroCta">
                <span className="cta-arrow left">→</span>
                <span className="cta-text">Créer</span>
                <span className="cta-arrow right">→</span>
              </button>
            </Link>
          </div>
        </section>
      </div>

      <section className="info">
        <div className="gradient-text">
          Créez des récits interactifs, explorez ceux des autres et partagez vos
          créations en quelques clics.
        </div>
      </section>
      <RecentsUiCard story={story} />
      <Footer />
    </div>
  );
};

export default Accueil;
