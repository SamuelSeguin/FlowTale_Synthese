"use client";
import Link from "next/link";
import "./CompteCreateur.css";
import Footer from "../_components/Footer";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PublicDisplay from "./PublicDisplay";
import { useAudio } from "../_contexts/AudioContext";
import { deleteStoryAction } from "../_actions/storyAction";

const CompteCreateur = ({ user, story = [] }) => {
  const containerRef = useRef();
  const titreRef = useRef();
  const { stop } = useAudio(false);

  useEffect(() => {
    stop();
  }, []);

  const deleteStoryLocal = async (storyId) => {
    await deleteStoryAction(storyId, user.id);
  };

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

  return (
    <div>
      <div className="pfp-bg">
        <div className="pfp-name-flex">
          <img
            className="pfp-createur"
            src={user?.image || "/png/pfp_placeholder.png"}
            alt=""
          />
          <h2 className="compte-nom">{user?.name}</h2>
        </div>
      </div>

      <h1 className="titre-page" ref={titreRef}>
        Vos créations
      </h1>

      <div className="histoires-container-flex" ref={containerRef}>
        {/* Bouton pour créer une nouvelle histoire */}
        <Link href="/creation_histoire" className="histoire-container create-story">
          <article>
            <div>
              <h2 className="create-title">Créer une histoire</h2>
              <p className="create-text">Commencez votre aventure ici</p>
            </div>
            <img className="create-plus" src="/png/plus.png" alt="" />
          </article>
        </Link>

        {/* Si l'utilisateur n'a pas encore créé d'histoires */}
        {story.length === 0 && (
          <p>Vous n'avez pas encore créé d'histoires. Commencez dès maintenant !</p>
        )}

        {/* Boucle sur toutes les histoires */}
        {story.map((histoire) => (
          <article className="histoire-container" key={histoire.id}>
            <img className="histoire-image" src={histoire.image} alt="" />
            <div className="text-content">
              <img
                className="bin"
                src="/png/bin.png"
                alt="supprimer"
                onClick={() => deleteStoryLocal(histoire.id)}
              />
              <h2 className="histoire-titre">{histoire.titre}</h2>
              <h2 className="histoire-auteur">{histoire.auteurName}</h2>
              <p className="histoire-synopsis">{histoire.synopsis}</p>

              <div className="icons">
                <div className="icons-top">
                  <Link href={`/construction_histoire/${histoire.id}`}>
                    <img src="/png/pencil-square-o.png" alt="modifier" />
                  </Link>
                  <Link href={`/histoires/${histoire.id}`}>
                    <img src="/png/magnifier.png" alt="visualisation" />
                  </Link>
                  <PublicDisplay
                    isPublic={histoire.public}
                    storyId={histoire.id}
                    userId={user.id}
                  />
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
