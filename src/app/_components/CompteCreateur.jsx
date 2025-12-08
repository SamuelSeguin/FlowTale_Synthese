"use client";
import Link from "next/link";
import "./CompteCreateur.css";
import Footer from "../_components/Footer";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PublicDisplay from "./PublicDisplay";

const CompteCreateur = ({ user, story = [] }) => {
  const containerRef = useRef();
  const titreRef = useRef();

  useGSAP(() => {
    gsap.from(titreRef.current, {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power3.out",
    });

    const cards = containerRef.current.querySelectorAll(
      ".histoire-container, .create-story"
    );
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.5,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });
  });

  console.log("USER COMPTE CREATEUR PARAMS :", user);
  console.log("STORY COMPTE CREATEUR PARAMS :", story);

  return (
    <div>
      <div className="pfp-name-flex">
        {user?.image === null ? (
          <img className="pfp-createur" src="/png/pfp_placeholder.png" alt="" />
        ) : (
          <img className="pfp-createur" src={user?.image} alt="" />
        )}
        <h2>{user?.name}</h2>
      </div>
      <h1 className="titre-page" ref={titreRef}>
        Vos créations
      </h1>
      <div className="histoires-container-flex" ref={containerRef}>
        <Link
          href="/creationHistoire"
          className="histoire-container create-story"
        >
          <article>
            <div>
              <h2 className="create-title">Créer une histoire</h2>
              <p className="create-text">Commencez votre aventure ici</p>
            </div>
            <img className="create-plus" src="/png/plus.png" alt="" />
          </article>
        </Link>

        {story.map((histoire) => (
          <article className="histoire-container" key={histoire.id}>
            <img className="histoire-image" src="/jpg/horreur1.jpg" alt="" />
            <div className="text-content">
              <PublicDisplay className="bin" isPublic={histoire.public} storyId={histoire.id} userId={user.id} />
              <h2 className="histoire-titre">{histoire.titre}</h2>
              <h2 className="histoire-auteur">{histoire.auteurName}</h2>
              <p className="histoire-synopsis">{histoire.synopsis}</p>
              <div className="icons">
                <div className="icons-left">
                  <Link href={`/constructionHistoire/${histoire.id}`} className="btn-link reset">
                    <button className="btn-left">
                      Modifier
                    </button>
                  </Link>
                  <Link href={`/histoires/${histoire.id}`} className="btn-link reset">
                    <button className="btn-left">
                      Visualiser
                    </button>
                  </Link>
                </div>
                <div className="icons-right">
                  <Link href={`/histoires/${histoire.id}/stats`} className="">
                    <button className="btn-small" >
                      <img src="/png/comment.png" alt="commentaires" />
                    </button>
                  </Link>
                  <Link href="" className="">
                    <button className="btn-small" >
                      <img className="" src="/png/bin.png" alt="" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))
        }
      </div>
      <Footer />
    </div>
  );
};

export default CompteCreateur;
