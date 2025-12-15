"use client";
import Link from "next/link";
import "./Utilisateur.css";
import Footer from "../_components/Footer";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Utilisateur = ({ histoire }) => {
  const containerRef = useRef();
  const headerRef = useRef();

  /* ------------------------------------
      ANIMATIONS GSAP
  ------------------------------------ */
  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power2.out",
    });

    const cards = containerRef.current.querySelectorAll(".histoire-container");
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.5,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
    });
  });

  return (
    <div>
      {/* ------------------------------------
          EN-TÊTE AVEC IMAGE ET NOM
      ------------------------------------ */}
      <div className="pfp-bg">
        <div className="pfp-name-flex">
          <img
            className="pfp-createur"
            src="/png/pfp_placeholder.png"
            alt={`Image de profil de: ${histoire[0].auteurName}`}
          />
          <h2 className="compte-nom">{histoire[0].auteurName}</h2>
        </div>
      </div>

      {/* ------------------------------------
          LISTE DES HISTOIRES CRÉÉES
      ------------------------------------ */}
      <div className="histoires-container-flex" ref={containerRef}>
        <h1 className="titre-page" ref={headerRef}>
          Créations
        </h1>

        {/* Boucle d’affichage des histoires */}
        {histoire.map((histoireItem) => (
          <article className="histoire-container" key={histoireItem.id}>
            {/* Image placeholder */}
            <img className="histoire-image" src="/jpg/horreur1.jpg" />

            <div className="text-content">
              <h2 className="histoire-titre">{histoireItem.titre}</h2>
              <h2 className="histoire-auteur">{histoireItem.auteurName}</h2>
              <p className="histoire-synopsis">{histoireItem.synopsis}</p>

              <div className="icons">
                <div className="icons-top">
                  <Link href={`/histoires/${histoire.id}`} className="btn-link">
                    <button className="btn-left">Visualiser</button>
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

export default Utilisateur;
