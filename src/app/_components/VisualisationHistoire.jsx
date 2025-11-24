"use client";
import "./VisualisationHistoire.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

const VisualisationHistoire = () => {
  const textRef = useRef();
  const backgroundRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const split = new SplitText(textRef.current, { type: "words" });
    const splitLines = new SplitText(textRef.current, { type: "lines" });
    const horreurTl = gsap.timeline();
    const horreurBgTl = gsap.timeline({ repeat: -1, yoyo: true });
    const futTl = gsap.timeline();
    const futBgTl = gsap.timeline({ repeat: -1, yoyo: true });
    const fantTl = gsap.timeline();
    const fantBgTl = gsap.timeline({ repeat: -1, yoyo: true });

    //  -- HORREUR --
    // if (ambiance === "horreur") {
    //   gsap.set(backgroundRef.current, {
    //     "--bg-color": "#5e0c0c",
    //   });

    //   gsap.set(textRef.current, {
    //     color: "#f02525",
    //   });

    //   horreurTl.from(split.words, {
    //     opacity: 0,
    //     y: 30,
    //     rotation: -5,
    //     duration: 0.5,
    //     stagger: {
    //       each: 0.08,
    //       from: "random",
    //     },
    //     ease: "back.out(2)",
    //   });

    //   horreurTl.to(split.words, {
    //     x: 3,
    //     duration: 0.06,
    //     repeat: 5,
    //     yoyo: true,
    //     ease: "power1.inOut",
    //   });

    //   horreurBgTl.to(backgroundRef.current, {
    //     "--bg-color": "#100000",
    //     duration: 3,
    //     ease: "sine.inOut",
    //   });

    //   horreurBgTl.to(
    //     backgroundRef.current,
    //     {
    //       "--bg-color": "#f02525",
    //       duration: 0.2,
    //       yoyo: true,
    //       repeat: 1,
    //       ease: "power1.inOut",
    //     },
    //     "-=0.1"
    //   );

    //  -- FANTASTIQUE --
    // } else if (ambiance === "fantastique") {
    // gsap.set(textRef.current, {
    //   color: "#31243e",
    // });

    // fantTl.from(splitLines.lines, {
    //   opacity: 0,
    //   x: -90,
    //   scale: 0.80,
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
    // tl.from(split.words, {
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

  return (
    <div className="wrapper" ref={backgroundRef}>
      {/* {theme === "fantastique" && ( */}
      {/* <> */}
      <div className="sparkle sparkle-1" />
      <div className="sparkle sparkle-2" />
      <div className="sparkle sparkle-3" />
      {/* </> */}
      {/* )} */}

      <div className="histoire-container">
        <p ref={textRef}>
          Dans le royaume caché d’Éloria, la brume ne se dissipe jamais
          entièrement. Lorsque Lira, une jeune cartographe intrépide, découvre
          une carte ancienne révélant l’existence des Portes des Mondes, elle se
          lance dans une quête périlleuse.
        </p>
      </div>

      <button className="visualisation-cta-btn">
        <span className="visualisation-cta-arrow left">→</span>
        <span className="visualisation-cta-text">Retour</span>
        <span className="visualisation-cta-arrow right">→</span>
      </button>
    </div>
  );
};

export default VisualisationHistoire;
