"use client";
import Link from "next/link";
import Footer from "../_components/Footer";
import "./FicheHistoire.css";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { useAudio } from "../_contexts/AudioContext";

const FicheHistoire = ({ histoire, user }) => {
  const containerRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  const btnVisualiserRef = useRef();
  const btnReprendreRef = useRef();
  const { stop } = useAudio(false);
  const router = useRouter();
  const [peutReprendre, setpeutReprendre] = useState(false);

  // Stop l'audio
  useEffect(() => {
    stop();
  }, []);

  // Vérifie si on peut reprendre la visualisation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const progresSauvegarde = window.localStorage.getItem(
      `progress-${histoire.id}`
    );
    if (!progresSauvegarde) return;

    const progress = JSON.parse(progresSauvegarde);
    if (progress.currentNodeId) {
      setpeutReprendre(true);
    }
  }, [histoire.id]);

  const reprendreHistoire = () => {
    if (typeof window === "undefined") return;

    const progresSauvegarde = window.localStorage.getItem(
      `progress-${histoire.id}`
    );
    if (!progresSauvegarde) return;

    const progress = JSON.parse(progresSauvegarde);
    if (progress.currentNodeId) {
      router.push(
        `/visualisationhistoire/${histoire.id}/${progress.currentNodeId}`
      );
    }
  };

  useGSAP(
    () => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

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
          <img
            ref={imageRef}
            className="fiche-image"
            src={histoire?.image}
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

            <div className="btns-fiche">
              <Link href={`/visualisationhistoire/${histoire.id}`}>
                <button className="fiche-cta-btn" ref={btnVisualiserRef}>
                  <span className="fiche-cta-arrow left">→</span>
                  <span className="fiche-cta-text">Visualiser</span>
                  <span className="fiche-cta-arrow right">→</span>
                </button>
              </Link>

              <button
                type="button"
                className="btn-reprendre"
                ref={btnReprendreRef}
                onClick={reprendreHistoire}
              >
                Reprendre visualisation
                <img
                  className="img-reprendre"
                  src="/png/reprendre.png"
                  alt="Icône bouton reprendre"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FicheHistoire;