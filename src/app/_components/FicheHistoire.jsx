"use client";
import Link from "next/link";
import Footer from "../_components/Footer";
import "./FicheHistoire.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FicheHistoire = ({ histoire, user }) => {
  const containerRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  const btnVisualiserRef = useRef();
  const btnReprendreRef = useRef();

  useGSAP(
    () => {
      // -------------------------------
      // Animation de l'image
      // -------------------------------
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
      });

      // -------------------------------
      // Animation du texte / contenu
      // -------------------------------
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      // -------------------------------
      // Animation du bouton CTA
      // -------------------------------
      gsap.to([btnVisualiserRef.current, btnReprendreRef.current], {
        opacity: 1,
        y: 0,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="fiche-container">
        <div className="fiche-flex">
          {/* Image de la fiche */}
          <img
            ref={imageRef}
            className="fiche-image"
            src={histoire?.image}
            alt=""
          />

          {/* Contenu principal */}
          <div className="fiche-content" ref={contentRef}>
            <h1 className="fiche-titre">{histoire?.titre}</h1>

            <Link href={`/compte/${histoire?.auteurId}`}>
              <h2 className="fiche-auteur">{histoire?.auteurName}</h2>
            </Link>

            <div className="genre-fiche-bg">
              <p className="genre-fiche">{histoire.ambiance}</p>
            </div>

            <p className="fiche-synopsis">{histoire?.synopsis}</p>

            <div className="btns-fiche">
              <Link href={`/visualisationhistoire/${histoire.id}`}>
                <button className="fiche-cta-btn" ref={btnVisualiserRef}>
                  <span className="fiche-cta-arrow left">→</span>
                  <span className="fiche-cta-text">Visualiser</span>
                  <span className="fiche-cta-arrow right">→</span>
                </button>
              </Link>
              <Link href="">
                <button className="btn-reprendre" ref={btnReprendreRef}>
                  Reprendre visualisation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FicheHistoire;
