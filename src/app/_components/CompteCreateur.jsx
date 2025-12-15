"use client";
import Link from "next/link";
import "./CompteCreateur.css";
import Footer from "../_components/Footer";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PublicDisplay from "./PublicDisplay";
import { useAudio } from "../_contexts/AudioContext";
import { DeleteStoryByIdAction } from "../_actions/storyAction";

const CompteCreateur = ({ user, story = [] }) => {
  const containerRef = useRef();
  const titreRef = useRef();

  const { stop } = useAudio(false);

  // Stop l'audio au chargement du composant
  useEffect(() => {
    stop();
  }, []);

  // Animation GSAP
  useGSAP(() => {
    gsap.from(titreRef.current, {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power3.out",
    });

    const cards = containerRef.current.querySelectorAll(
      ".histoire-container, .create-story"
    );
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.5,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });
  });

  const deleteLocalStory = async (storyId) => {
    await DeleteStoryByIdAction(storyId, user.id);
  }

  return (
    <div>
      <div className="pfp-bg">
        <div className="pfp-name-flex">
          {/* Affichage de l'image utilisateur ou placeholder */}
          {user?.image === null ? (
            <img
              className="pfp-createur"
              src="/png/pfp_placeholder.png"
              alt=""
            />
          ) : (
            <img className="pfp-createur" src={user?.image} alt="" />
          )}
          <h2 className="compte-nom">{user?.name}</h2>
        </div>
      </div>

      {/* LISTE DES HISTOIRES */}
      <div className="histoires-container-flex" ref={containerRef}>
        <h1 className="titre-page" ref={titreRef}>
          Vos créations
        </h1>

        {/* Carte pour créer une nouvelle histoire */}
        <Link
          href="/creationHistoire"
          className="histoire-container create-story"
        >
          <article>
            <div>
              <h2 className="create-title">Créer une histoire</h2>
              <p className="create-text">Commencez votre aventure ici</p>
            </div>
            <img className="create-plus" src="/png/plus.png" alt="" />
          </article>
        </Link>

        {/* Boucle sur toutes les histoires de l'utilisateur */}
        {story.map((histoire) => (
          <article className="histoire-container" key={histoire.id}>
            <img className="histoire-image" src={histoire.image} alt="" />

            <div className="text-content">
              {/* Composant pour gérer l'affichage public/privé */}
              <PublicDisplay
                className="bin"
                isPublic={histoire.public}
                storyId={histoire.id}
                userId={user.id}
              />

              <h2 className="histoire-titre">{histoire.titre}</h2>
              <h2 className="histoire-auteur">{histoire.auteurName}</h2>

              <p className="histoire-synopsis">{histoire.synopsis}</p>

              {/* BOUTONS D'ACTIONS */}
              <div className="icons">
                <div className="icons-left">
                  {/* Bouton pour modifier l'histoire */}
                  <Link
                    href={`/constructionHistoire/${histoire.id}`}
                    className="btn-link reset"
                  >
                    <button className="btn-left">Modifier</button>
                  </Link>

                  {/* Bouton pour visualiser l'histoire */}
                  <Link
                    href={`/histoires/${histoire.id}`}
                    className="btn-link reset"
                  >
                    <button className="btn-left">Visualiser</button>
                  </Link>
                </div>

                <div className="icons-right">
                  {/* Bouton commentaires */}
                  <Link href={`/histoires/${histoire.id}/stats`} className="">
                    <button className="btn-small">
                      <img src="/png/comment.png" alt="commentaires" />
                    </button>
                  </Link>

                  {/* Bouton pour supprimer l'histoire */}
                  <Link href="" className="">
                    <button
                      type="button"
                      onClick={() => deleteLocalStory(histoire.id)}
                      className="btn-small"
                    >
                      <img src="/png/bin.png" alt="" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default CompteCreateur;
