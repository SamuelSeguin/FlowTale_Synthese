"use client";
import { useState, useEffect, useRef } from "react";
import "./VisualisationHistoire.css";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useAudio } from "../_contexts/AudioContext";
import { v4 as uuidv4 } from "uuid";
import { AddCommentAction } from "../_actions/commentsAction";

const VisualisationHistoire = ({
  story,
  current,
  edges,
  storyId,
  isStoryEnd,
  startNodeId,
  user,
}) => {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [modalOuvert, setModalOuvert] = useState(false);

  const ouvrirModal = () => setModalOuvert(true);
  const fermerModal = () => setModalOuvert(false);

  const isChoice = (edges?.length ?? 0) > 1;
  const hasNext = (edges?.length ?? 0) > 0;

  const textRef = useRef();
  const imageRef = useRef();
  const backgroundRef = useRef();

  /* ------------------------------------
      SAUVEGARDE DU PROGRES
  ------------------------------------ */

  useEffect(() => {
    if (!current?.id || !storyId) return;

    if (typeof window === "undefined") return;

    const savedProgress = {
      currentNodeId: current.id, // id du noeud sauvegardé
    };

    // enregistre la progression dans le localStorage
    window.localStorage.setItem(
      `progress-${storyId}`,
      JSON.stringify(savedProgress)
    );
  }, [current?.id, storyId]);

  /* ------------------------------------
      ANIMATIONS GSAP
  ------------------------------------ */
  useEffect(() => {
    if (!textRef.current || !backgroundRef.current || !story?.ambiance) return;

    gsap.registerPlugin(SplitText, ScrambleTextPlugin);

    const split = new SplitText(textRef.current, { type: "words" });
    const splitLines = new SplitText(textRef.current, { type: "lines" });

    const horreurTl = gsap.timeline();
    const horreurBgTl = gsap.timeline({ repeat: -1, yoyo: true });
    const fantTl = gsap.timeline();
    const fantBgTl = gsap.timeline({ repeat: -1, yoyo: true });
    const futTl = gsap.timeline();

    console.log("STORY", story, "ANIMATION", story.animation);

    if (story.ambiance === "horreur") {
      gsap.set(backgroundRef.current, { "--bg-color": "#5e0c0c" });
      gsap.set(textRef.current, { color: "#f02525" });
      horreurBgTl.to(backgroundRef.current, {
        "--bg-color": "#100000",
        duration: 3,
        ease: "sine.inOut",
      });
    } else if (story.ambiance === "fantastique") {
      gsap.set(textRef.current, { color: "#31243e" });
      fantBgTl.to(backgroundRef.current, {
        backgroundPosition: "100% 0%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".sparkle", {
        y: -10,
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "random" },
      });
    } else if (story.ambiance === "futuriste") {
      gsap.set(textRef.current, { color: "#97f8ff" });
    }

    if (story.animation === "entreeChaotique") {
      horreurTl.from(split.words, {
        opacity: 0,
        y: 30,
        rotation: -5,
        duration: 0.5,
        stagger: { each: 0.08, from: "random" },
        ease: "back.out(2)",
      });
    } else if (story.animation === "glissement") {
      fantTl.from(splitLines.lines, {
        opacity: 0,
        x: -90,
        scale: 0.8,
        duration: 1.2,
        stagger: 0.7,
        ease: "power2.out",
      });
    } else if (story.animation === "dechiffrage") {
      futTl.to(textRef.current, {
        duration: 2,
        scrambleText: {
          text: textRef.current.innerText,
          chars: "0 1 A",
          speed: 0.2,
        },
      });
    } else if (story.animation === "chute") {
      gsap.from(split.words, {
        opacity: 0,
        y: -150,
        rotationX: -90,
        transformOrigin: "50% 50%",
        duration: 1.2,
        stagger: { each: 0.15, from: "random" },
        ease: "power2.out",
      });
    } else if (story.animation === "fadein") {
      gsap.from(split.words, {
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }

    // Animation de l'image si elle existe
    if (current.data?.image && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [current, story]);

  /* ------------------------------------
      AUDIO
  ------------------------------------ */
  const { changeSource, play, isReady, changeVolume } = useAudio(false);
  const isNodeStart = useRef(false);

  useEffect(() => {
    if (current.id !== startNodeId) return;
    if (isNodeStart.current) return;
    isNodeStart.current = true;

    const fichierAudio =
      story.ambiance === "horreur"
        ? "/audio/horreur.mp3"
        : story.ambiance === "fantastique"
        ? "/audio/fantastique.mp3"
        : story.ambiance === "futuriste"
        ? "/audio/futuriste.mp3"
        : null;

    changeSource(fichierAudio, false);
    changeVolume(0.1);
  }, [story?.ambiance, current?.id, startNodeId, changeSource]);

  useEffect(() => {
    if (!isReady) return;
    if (current?.id !== startNodeId) return;
    play();
  }, [isReady, current?.id, startNodeId, play]);

  const wrapperClass =
    story?.ambiance === "horreur"
      ? "wrapper wrapper--horreur"
      : story?.ambiance === "fantastique"
      ? "wrapper wrapper--fantastique"
      : story?.ambiance === "futuriste"
      ? "wrapper wrapper--futuriste"
      : "wrapper";

  const localAddComment = async (formData) => {
    const comment = formData.get("comment");

    const newComment = {
      id: uuidv4(),
      text: comment,
      auteur: user.id,
      auteurName: user.name,
      storyId,
    };

    await AddCommentAction(newComment);
    fermerModal();
  };

  /* ------------------------------------
      RENDU VISUEL
  ------------------------------------ */
  return (
    <div className={wrapperClass} ref={backgroundRef}>
      {story.ambiance === "fantastique" && (
        <>
          <div className="sparkle sparkle-1" />
          <div className="sparkle sparkle-2" />
          <div className="sparkle sparkle-3" />
        </>
      )}

      <div
        className={`histoire-container-visualisation ${
          current.data?.image ? "avec-image" : ""
        }`}
      >
        {current.data?.image && (
          <div className="node-image" ref={imageRef}>
            <img src={current.data.image} alt="Image du node" />
          </div>
        )}

        <div className="node-content" ref={textRef}>
          <p>{current.data?.description}</p>
        </div>
      </div>

      {/* FIN D'HISTOIRE */}
      {isStoryEnd || !hasNext ? (
        <div className="fin-histoire">
          <div className="btn-flex">
            <Link href="/" className="btn-link-visualisation">
              <button className="btn-visualisation">Retour à l'accueil</button>
            </Link>

            {user && (
              <button
                type="button"
                className="btn-visualisation btn-commentaire"
                onClick={ouvrirModal}
              >
                Laisser un commentaire
              </button>
            )}

            <Link
              href={`/visualisationhistoire/${storyId}/${startNodeId}`}
              className="btn-link-visualisation"
            >
              <button className="btn-visualisation">Recommencer</button>
            </Link>
          </div>
        </div>
      ) : null}

      {/* MODAL DE COMMENTAIRE */}
      {modalOuvert && (
        <div className="modal-fond">
          <div className="modal-contenu">
            <button className="modal-fermer" onClick={fermerModal}>
              &times;
            </button>

            <h2 className="modal-comment-title">Laisser un commentaire</h2>
            <form action={localAddComment}>
              <input
                type="text"
                name="comment"
                className="commentaire-textarea"
                placeholder="Partagez votre avis sur cette histoire..."
              />

              <button className="form-cta-btn" type="submit">
                <span className="form-cta-arrow left">→</span>
                <span className="form-cta-text">Envoyer</span>
                <span className="form-cta-arrow right">→</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOUTON "CONTINUER" SI 1 SEUL CHOIX */}
      {!isStoryEnd && edges?.length === 1 && (
        <div>
          <Link
            href={`/visualisationhistoire/${storyId}/${edges[0].targetNodeId}`}
            className="choix-btn-continuer"
          >
            Continuer
          </Link>
        </div>
      )}

      {/* BOUTONS DE CHOIX */}
      {!isStoryEnd && isChoice && (
        <div className="choix-container">
          {edges.map((edge) => (
            <button
              key={edge.id}
              className={
                selectedTarget === edge.targetNodeId
                  ? "choix-btn selected"
                  : "choix-btn"
              }
              onClick={() => setSelectedTarget(edge.targetNodeId)}
            >
              {edge.texte}
            </button>
          ))}
        </div>
      )}

      {/* BOUTON CONFIRMATION DU CHOIX */}
      {selectedTarget && (
        <Link
          href={`/visualisationhistoire/${storyId}/${selectedTarget}`}
          className="choix-btn-confirmer"
        >
          Confirmer mon choix
        </Link>
      )}
    </div>
  );
};

export default VisualisationHistoire;