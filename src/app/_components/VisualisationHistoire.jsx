"use client";
import Link from "next/link";
import "./VisualisationHistoire.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

const VisualisationHistoire = ({
  story,
  current,
  edges,
  storyId,
  isStoryEnd,
  startNodeId,
}) => {
  const textRef = useRef(null);
  const backgroundRef = useRef(null);
  const [selectedTarget, setSelectedTarget] = useState();
  const safeEdges = edges ?? [];
  const isChoice = safeEdges.length > 1;
  const hasNext = safeEdges.length > 0;

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
  }, [story, current]);

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

      <div className="histoire-container">
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
            <Link href={`/storyvisualizer/${storyId}/${startNodeId}`}>
              <button className="visualisation-cta-btn">
                <span className="visualisation-cta-arrow left">→</span>
                <span className="visualisation-cta-text">Recommencer</span>
                <span className="visualisation-cta-arrow right">→</span>
              </button>
            </Link>
          </div>
        ) : null}

        {/* Un seul choix */}
        {!isStoryEnd && safeEdges.length === 1 && (
          <div>
            <Link
              href={`/storyvisualizer/${storyId}/${safeEdges[0].targetNodeId}`}
              className="choix-btn-continuer"
            >
              Continuer
            </Link>
          </div>
        )}

        {/* Plusieurs choix avec confirmation */}
        {!isStoryEnd && isChoice && (
          <div className="choix-container">
            {safeEdges.map((edge) => (
              <button
                key={edge.id}
                className={
                  selectedTarget === edge.targetNodeId
                    ? "choix-btn selected"
                    : "choix-btn"
                }
                onClick={() => setSelectedTarget(edge.targetNodeId)}
              >
                {edge.texte || "Choisir"}
              </button>
            ))}

            {selectedTarget && (
              <Link
                href={`/storyvisualizer/${storyId}/${selectedTarget}`}
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
