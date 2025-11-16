"use client";
import "./Accueil.css";

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
        <div className="infoLeft">
          <div>
            <em>Créez</em> des récits interactifs,
            <br />
            <em>explorez</em> ceux des autres et
            <br />
            <em>partagez</em> vos créations en
            <br />
            quelques clics.
          </div>
        </div>
        <div className="infoRight">{/* <img src="" alt="" /> */}</div>
      </section>
    </div>
  );
};

export default Accueil;
