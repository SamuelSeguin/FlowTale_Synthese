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
  const btnRef = useRef();

  useGSAP(() => {
    // IMAGE ANIMATION
    gsap.from(imageRef.current, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power2.out",
    });

    // CONTENT ANIMATION
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    // BUTTON ANIMATION
    gsap.from(btnRef.current, {
      opacity: 0,
      scale: 0.6,
      delay: 0.6,
      duration: 0.8,
      ease: "back.out(1.2)",
    });
  });

  return (
    <div ref={containerRef}>
      <div className="fiche-container">
        <div className="fiche-flex">
          <img
            ref={imageRef}
            className="fiche-image"
            src="../../../jpg/horreur1.jpg"
            alt=""
          />
          <div className="fiche-content" ref={contentRef}>
            <h1 className="fiche-titre">{histoire?.titre}</h1>
            <Link href={`/compte/${histoire?.auteurId}`}>
              <h2 className="fiche-auteur">{histoire?.auteurName}</h2>
            </Link>
            <div className="genre-fiche-bg">
              <p className="genre-fiche">{histoire.ambiance}</p>
            </div>
            <p className="fiche-synopsis">{histoire?.synopsis}</p>

            <Link href={`/visualisationhistoire/${histoire.id}`}>
              <button className="fiche-cta-btn" ref={btnRef}>
                <span className="fiche-cta-arrow left">→</span>
                <span className="fiche-cta-text">Visualiser</span>
                <span className="fiche-cta-arrow right">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FicheHistoire;
