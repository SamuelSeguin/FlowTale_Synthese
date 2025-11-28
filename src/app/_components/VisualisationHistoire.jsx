"use client";
import { useState, useEffect, useRef } from "react";
import "./VisualisationHistoire.css";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

const VisualisationHistoire = ({ story }) => {

  const [parsedNodes, setParsedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const textRef = useRef();
  const backgroundRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrambleTextPlugin);

    const split = new SplitText(textRef.current, { type: "words" });
    const splitLines = new SplitText(textRef.current, { type: "lines" });
    const horreurTl = gsap.timeline();
    const horreurBgTl = gsap.timeline({ repeat: -1, yoyo: true });
    const fantTl = gsap.timeline();
    const fantBgTl = gsap.timeline({ repeat: -1, yoyo: true });
    const futTl = gsap.timeline();
    const futBgTl = gsap.timeline({ repeat: -1, yoyo: true });

    //  -- HORREUR --
    // if (ambiance === "horreur") {
    // gsap.set(backgroundRef.current, {
    //   "--bg-color": "#5e0c0c",
    // });

    // gsap.set(textRef.current, {
    //   color: "#f02525",
    // });

    // horreurTl.from(split.words, {
    //   opacity: 0,
    //   y: 30,
    //   rotation: -5,
    //   duration: 0.5,
    //   stagger: {
    //     each: 0.08,
    //     from: "random",
    //   },
    //   ease: "back.out(2)",
    // });

    // horreurTl.to(split.words, {
    //   x: 3,
    //   duration: 0.06,
    //   repeat: 5,
    //   yoyo: true,
    //   ease: "power1.inOut",
    // });

    // horreurBgTl.to(backgroundRef.current, {
    //   "--bg-color": "#100000",
    //   duration: 3,
    //   ease: "sine.inOut",
    // });

    //  -- FANTASTIQUE --
    // } else if (ambiance === "fantastique") {
    // gsap.set(textRef.current, {
    //   color: "#31243e",
    // });

    // fantTl.from(splitLines.lines, {
    //   opacity: 0,
    //   x: -90,
    //   scale: 0.8,
    //   duration: 1.2,
    //   stagger: 0.7,
    //   ease: "power2.out",
    // });

    // fantBgTl.to(backgroundRef.current, {
    //   backgroundPosition: "100% 0%",
    //   duration: 10,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "sine.inOut",
    // });

    // gsap.to(".sparkle", {
    //   y: -10,
    //   opacity: 0.3,
    //   duration: 1,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "sine.inOut",
    //   stagger: { each: 0.5, from: "random" },
    // });

    //  -- FUTURISTE --
    // } else if (ambiance === "futuriste") {
    gsap.set(textRef.current, { color: "#97f8ff" });

    futTl.to(textRef.current, {
      duration: 5,
      scrambleText: {
        text: textRef.current.textContent,
        chars: "0 1 A",
        speed: 0.3,
      },
    });
    // }
  }, []);

  // const wrapperClass =
  //   theme === "horreur"
  //     ? "wrapper wrapper--horreur"
  //     : theme === "futuriste"
  //     ? "wrapper wrapper--futuriste"
  //     : theme === "fantastique"
  //     ? "wrapper wrapper--fantastique"
  //     : "wrapper";

  // --- Fonction qui parse seulement si c'est une string JSON ---
  const safeParse = (value) => {
    if (!value) return {};
    if (typeof value === "object") return value; // déjà un objet OK
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.warn("❌ JSON invalide :", value);
        return {};
      }
    }
    return {};
  };

  useEffect(() => {
    if (!story || !story.nodes) return;

    const nodes = story.nodes.map((node) => ({
      ...node,
      data: safeParse(node.data),                // ⬅ FIX
      outgoingEdges: node.outgoingEdges?.map((edge) => ({
        ...edge,
        data: safeParse(edge.data),              // ⬅ FIX
      })) || [],
    }));

    setParsedNodes(nodes);

    // Recherche du nœud "Début"
    const startNode = nodes.find((n) => n.data?.type === "Début");

    console.log("Nœud de départ trouvé :", startNode);

    if (startNode) setCurrentNode(startNode);
    else console.warn("⚠️ Aucun nœud de type 'Début' trouvé");

  }, [story]);

  if (!currentNode) return <div>Chargement...</div>;

  const outgoing = currentNode.outgoingEdges || [];

  const goToNode = (nodeId) => {
    const next = parsedNodes.find((n) => n.id === nodeId);
    if (next) setCurrentNode(next);
  };

  return (
    <div className="wrapper" ref={backgroundRef}>
      <div className="histoire-container">

        {/* FIN DE L'HISTOIRE */}
        {outgoing.length === 0 && (
          <>
            <div className="fin-histoire">
              <p>
                {currentNode.data?.description}
              </p>
            </div>
            <Link href={"/"}>
              Retourner à l'accueil
            </Link>
          </>
        )}

        {/* NODE AVEC UN SEUL CHEMIN → AFFICHER "CONTINUER" */}
        {outgoing.length === 1 && (
          <div>
            <div className="node-content">
              <p ref={textRef}>
                {currentNode.data?.description}
              </p>
            </div>

            <button
              className="choix-btn continuer-btn"
              onClick={() => goToNode(outgoing[0].target)}
            >
              Continuer →
            </button>
          </div>
        )}

        {/* NODE AVEC PLUSIEURS CHOIX */}
        {outgoing.length > 1 && (
          <div>
            <div className="node-content">
              <p>
                {currentNode.data?.description}
              </p>
            </div>

            <div className="choix-container">
              {outgoing.map((edge) => (
                <button
                  key={edge.id}
                  className="choix-btn"
                  onClick={() => goToNode(edge.target)}
                >
                  {edge.data?.texte || "Choisir"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* BOUTON RETOUR */}
      <Link href={`/histoires/${story.id}`}>
        <button className="visualisation-cta-btn">
          <span className="visualisation-cta-arrow left">→</span>
          <span className="visualisation-cta-text">Retour</span>
          <span className="visualisation-cta-arrow right">→</span>
        </button>
      </Link>
    </div>
  );
};

export default VisualisationHistoire;
