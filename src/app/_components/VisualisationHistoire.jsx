"use client";
import { useState, useEffect, useRef } from "react";
import "./VisualisationHistoire.css";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useAudio } from "../_contexts/AudioContext";

const VisualisationHistoire = ({
  story,
  current,
  edges,
  storyId,
  isStoryEnd,
  startNodeId,
}) => {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const isChoice = (edges?.length ?? 0) > 1;
  const hasNext = (edges?.length ?? 0) > 0;
  const textRef = useRef();
  const backgroundRef = useRef();

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
    const futBgTl = gsap.timeline({ repeat: -1, yoyo: true });

    // AMBIANCES
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

    // ANIMATIONS
    if (story.musique === "entreeChaotique") {
      horreurTl.from(split.words, {
        opacity: 0,
        y: 30,
        rotation: -5,
        duration: 0.5,
        stagger: { each: 0.08, from: "random" },
        ease: "back.out(2)",
      });
    } else if (story.musique === "glissement") {
      fantTl.from(splitLines.lines, {
        opacity: 0,
        x: -90,
        scale: 0.8,
        duration: 1.2,
        stagger: 0.7,
        ease: "power2.out",
      });
    } else if (story.musique === "dechiffrage") {
      futTl.to(textRef.current, {
        duration: 2,
        scrambleText: {
          text: textRef.current.innerText,
          chars: "0 1 A",
          speed: 0.2,
        },
      });
    }
  }, [current, story]);

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

  return (
    <div className={wrapperClass} ref={backgroundRef}>
      {story.ambiance === "fantastique" && (
        <>
          <div className="sparkle sparkle-1" />
          <div className="sparkle sparkle-2" />
          <div className="sparkle sparkle-3" />
        </>
      )}

      <div className="histoire-container-visualisation">
        <div className="node-content">
          <p ref={textRef}>{current.data?.description}</p>
        </div>
        {/* Fin d'histoire */}
        {isStoryEnd || !hasNext ? (
          <div className="btn-flex">
            <Link href={`/histoires/${story.id}`}>
              <button className="visualisation-cta-btn">
                <span className="visualisation-cta-arrow left">→</span>
                <span className="visualisation-cta-text">
                  Retour à l'accueil
                </span>
                <span className="visualisation-cta-arrow right">→</span>
              </button>
            </Link>
            <Link href={`/visualisationhistoire/${storyId}/${startNodeId}`}>
              <button className="visualisation-cta-btn">
                <span className="visualisation-cta-arrow left">→</span>
                <span className="visualisation-cta-text">Recommencer</span>
                <span className="visualisation-cta-arrow right">→</span>
              </button>
            </Link>
          </div>
        ) : null}
        {/* Un seul choix */}
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
        {/* Plusieurs choix avec confirmation */}
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
            {selectedTarget && (
              <Link
                href={`/visualisationhistoire/${storyId}/${selectedTarget}`}
                className="choix-btn-confirmer"
              >
                Confirmer mon choix
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default VisualisationHistoire;
