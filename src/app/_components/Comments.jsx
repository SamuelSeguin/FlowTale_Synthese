"use client";
import "./Comments.css";
import "./CompteCreateur.css";
import Footer from "../_components/Footer";

const Comments = ({ comments, storyTitle, user}) => {
  return (
    <div>
      <div className="pfp-bg">
        <div className="pfp-name-flex">
          <img className="pfp-createur" src="/png/pfp_placeholder.png" alt="" />
          <h2 className="compte-nom">Émilie Paquin</h2>
        </div>
      </div>
      <div className="comments-container-flex">
        <h1 className="titre-page-comment">
          Ce que les utilisateurs pensent...
        </h1>
        <article className="comments-container">
          <h2 className="histoire-titre-comment">
            Les Brumes d’Éloria (exemple pour mise en page)
          </h2>
          <div className="comment-content">
            <h2 className="nom-utilisateur">Camille Lenoir</h2>
            <p className="commentaire">
              Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
              entièrement. Lorsque Lira, une jeune cartographe intrépide,
              découvre une carte ancienne révélant l’existence des Portes des
              Mondes, elle se lance dans une quête périlleuse. Entre magie
              ancestrale, créatures énigmatiques et alliances inattendues, Lira
              doit percer le secret des brumes pour sauver Éloria du danger qui
              grandit dans l’ombre.
            </p>
            <img className="comment-icon" src="/png/comment.png" alt="" />
          </div>
          <div className="comment-content">
            <h2 className="nom-utilisateur">Camille Lenoir</h2>
            <p className="commentaire">
              Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
              entièrement. Lorsque Lira, une jeune cartographe intrépide,
              découvre une carte ancienne révélant l’existence des Portes des
              Mondes, elle se lance dans une quête périlleuse. Entre magie
              ancestrale, créatures énigmatiques et alliances inattendues, Lira
              doit percer le secret des brumes pour sauver Éloria du danger qui
              grandit dans l’ombre.
            </p>
            <img className="comment-icon" src="/png/comment.png" alt="" />
          </div>{" "}
          <div className="comment-content">
            <h2 className="nom-utilisateur">Camille Lenoir</h2>
            <p className="commentaire">
              Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
              entièrement. Lorsque Lira, une jeune cartographe intrépide,
              découvre une carte ancienne révélant l’existence des Portes des
              Mondes, elle se lance dans une quête périlleuse. Entre magie
              ancestrale, créatures énigmatiques et alliances inattendues, Lira
              doit percer le secret des brumes pour sauver Éloria du danger qui
              grandit dans l’ombre.
            </p>
            <img className="comment-icon" src="/png/comment.png" alt="" />
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default Comments;
