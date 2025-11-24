"use client";
import "./CompteCreateur.css";

const CompteCreateur = () => {
  return (
    <div>
      <div className="pfp-name-flex">
        <img className="pfp-createur" src="/png/pfp_placeholder.png" alt="" />
        <h2>Émilie Paquin</h2>
      </div>
      <h1 className="titre-page">Vos créations</h1>
      <div className="histoires-container-flex">
        <article className="histoire-container">
          <div className="histoire-image"></div>

          <div className="text-content">
            <h2 className="histoire-titre">
              Les Brumes d’Éloria (exemple pour mise en page)
            </h2>
            <h2 className="histoire-auteur">Camille Lenoir</h2>
            <p className="histoire-synopsis">
              Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
              entièrement. Lorsque Lira, une jeune cartographe intrépide,
              découvre une carte ancienne révélant l’existence des Portes des
              Mondes, elle se lance dans une quête périlleuse. Entre magie
              ancestrale, créatures énigmatiques et alliances inattendues, Lira
              doit percer le secret des brumes pour sauver Éloria du danger qui
              grandit dans l’ombre.
            </p>
            <div className="icons">
              <div className="icons-top">
                <a href="">
                  <img src="/png/pencil-square-o.png" alt="modifier" />
                </a>
                <a href="">
                  <img src="/png/magnifier.png" alt="visualisation" />
                </a>
              </div>

              <div className="icons-bottom">
                <a href="">
                  <img src="/png/comment.png" alt="commentaires" />
                  <p>Commentaires</p>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CompteCreateur;
