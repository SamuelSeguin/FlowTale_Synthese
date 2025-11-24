"use client";
import Link from "next/link";
import "./CompteCreateur.css";

const CompteCreateur = ({ user, story=[] }) => {
  console.log("USER COMPTE CREATEUR PARAMS :", user);
  console.log("STORY COMPTE CREATEUR PARAMS :", story);

  return (
    <div>
      <div className="pfp-name-flex">
        {user?.image === null ? (
          <img className="pfp-createur" src="/png/pfp_placeholder.png" alt="" />
        ) : (
          <img className="pfp-createur" src={user?.image} alt="" />
        )}
        <h2>{user?.name}</h2>
      </div>
      <h1 className="titre-page">Vos créations</h1>
      <div className="histoires-container-flex">
        {story.length === 0 ? (
          <p>Vous n'avez pas encore créé d'histoires. Commencez dès maintenant !</p>
        ) : (
        story.map((histoire) => (
          <article className="histoire-container" key={histoire.id}>
          <div className="histoire-image"></div>

          <div className="text-content">
            <h2 className="histoire-titre">
              {histoire.titre}
            </h2>
            <h2 className="histoire-auteur">{histoire.auteurName}</h2>
            <p className="histoire-synopsis">
              {histoire.synopsis}
            </p>
            <div className="icons">
              <div className="icons-top">
                <Link href={`/histoires/${histoire.id}/stats`}>
                  <img src="/png/pencil-square-o.png" alt="modifier" />
                </Link>
                <Link href={`/histoires/${histoire.id}`}>
                  <img src="/png/magnifier.png" alt="visualisation" />
                </Link>
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
          ))
        )} 
      </div>
    </div>
  );
};

export default CompteCreateur;
