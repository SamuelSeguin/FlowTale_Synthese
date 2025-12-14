"use client";
import "./Accueil.css";
import RecentsUiCard from "../_components/RecentsUiCard";
import Footer from "../_components/Footer";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAudio } from "../_contexts/AudioContext";

gsap.registerPlugin(ScrollTrigger);

const Accueil = ({ stories }) => {
  const heroRef = useRef();
  const infoTextRef = useRef();
  const cardsRef = useRef();

  const { stop } = useAudio(false);

  // Stop l'audio
  useEffect(() => {
    stop();
  }, []);

  // Animations GSAP
  useGSAP(() => {
    gsap.from(heroRef.current.querySelector(".heroTitle"), {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
    });

    // HERO BUTTON ANIMATION
    const btn = heroRef.current.querySelector(".heroCta");
    gsap.from(btn, {
      opacity: 0,
      scale: 0.6,
      delay: 0.4,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // INFO TEXT SCROLL ANIMATION
    gsap.from(infoTextRef.current, {
      scrollTrigger: {
        trigger: infoTextRef.current,
        start: "top 90%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
    });

    // CARDS ANIMATION
    const cards = cardsRef.current?.querySelectorAll(".card-container");

    if (cards?.length) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.4,
        ease: "power3.out",
      });
    }
  });

  return (
    <div className="container">
      {/* SECTION HERO */}
      <div className="header-background" ref={heroRef}>
        <section className="hero">
          <h1 className="heroTitle">
            L’ART DE RACONTER, RÉINVENTÉ.
            <br />
            ICI, LA CRÉATIVITÉ PREND
            <br />
            TOUTES LES FORMES.
          </h1>

          {/* BOUTON HERO */}
          <div className="btn-hero">
            <Link href="/creation_histoire">
              <button className="heroCta">
                <span className="cta-arrow left">→</span>
                <span className="cta-text">Créer</span>
                <span className="cta-arrow right">→</span>
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* SECTION INFO */}
      <section className="info">
        <div className="gradient-text" ref={infoTextRef}>
          Créez des récits interactifs, explorez ceux des autres et partagez vos
          créations en quelques clics.
        </div>
      </section>

      {/* CARDS RÉCENTES */}
      <div ref={cardsRef}>
        <RecentsUiCard stories={stories} />
      </div>

      <Footer />
    </div>
  );
};

export default Accueil;
