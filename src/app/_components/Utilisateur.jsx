"use client";
import Link from "next/link";
import "./Utilisateur.css";

const Utilisateur = ({ histoire }) => {
  console.log("HISTOIRE DANS UTILISATEUR COMPONENT :", histoire);
  return (
    <div>
      <div className="pfp-name-flex">
        <img className="pfp-createur" src="/png/pfp_placeholder.png" alt="" />
        <h2>{histoire[0].auteurName}</h2>
      </div>
      <h1 className="titre-page">Créations</h1>
      <div className="histoires-container-flex">
        {histoire.map((histoireItem) => (
          <article className="histoire-container" key={histoireItem.id}>
          <div className="histoire-image"></div>

          <div className="text-content">
            <h2 className="histoire-titre">
              {histoireItem.titre}
            </h2>
            <h2 className="histoire-auteur">{histoireItem.auteurName}</h2>
            <p className="histoire-synopsis">
              {histoireItem.synopsis}
            </p>
            <div className="icons">
              <div className="icons-top">
                <Link href={`/histoires/${histoireItem.id}`}>
                  <img src="/png/magnifier.png" alt="visualisation" />
                </Link>
              </div>
            </div>
          </div>
        </article>
        ))}
      </div>
    </div>
  );
};

export default Utilisateur;
