"use client";
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./CreationHistoireForm.css";
import { CreationHistoireAction } from "../_actions/storyAction";
import Link from "next/link";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const CreationForm = ({ user }) => {
  const formRef = useRef();
  const leftMessageRef = useRef();

  useGSAP(() => {
    gsap.from(leftMessageRef.current, {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    const fields = formRef.current.querySelectorAll(
      "input, textarea, select, button[type='submit']"
    );
    gsap.from(fields, {
      opacity: 0,
      y: 25,
      stagger: 0.12,
      delay: 0.5,
      duration: 0.7,
      ease: "power2.out",
    });
  });

  const CreationAction = async (formData) => {
    // Récupérer les trois valeurs, titre / synopsis / ambiance / animation / musique
    const titre = formData.get("titre");
    const auteur = user.id;
    const synopsis = formData.get("synopsis");
    const ambiance = formData.get("ambiance");
    const musique = formData.get("musique");

    const newHistoireData = {
      id: uuidv4(),
      titre,
      auteur,
      auteurName: user.name,
      synopsis,
      ambiance,
      musique,
    };

    console.log(newHistoireData);

    await CreationHistoireAction(newHistoireData);
  };

  const [modalOuvert, setModalOuvert] = useState(false);

  const ouvrirModal = () => setModalOuvert(true);
  const fermerModal = () => setModalOuvert(false);

  return (
    <div className="form-background">
      <div className="creation-left-message" ref={leftMessageRef}>
        <p>
          Imagine. <br /> Anime. <br /> Partage.
        </p>
      </div>

      <form className="creation-form" action={CreationAction} ref={formRef}>
        <h2 className="titre-form-creation">Nouvelle histoire</h2>

        <label>
          <input
            id="fld_title"
            type="text"
            name="titre"
            required
            placeholder="Titre"
          />
        </label>
        <br />
        <label>
          <textarea
            id="fld_synopsis"
            name="synopsis"
            required
            placeholder="Synopsis"
            className="textarea-synopsis"
          />
        </label>
        <br />
        <div className="form-flex">
          <label>
            <select className="select" name="ambiance" required defaultValue="">
              <option value="" disabled>
                Ambiance
              </option>
              <option value="horreur">Horreur</option>
              <option value="fantastique">Fantastique</option>
              <option value="futuriste">Futuriste</option>
            </select>
          </label>
          <br />

          <label>
            <select className="select" name="musique" required defaultValue="">
              <option value="" disabled>
                Musique
              </option>
              <option value="classique">Classique</option>
              <option value="magique">Magique</option>
              <option value="suspense">Suspense</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="calme">Calme</option>
            </select>
          </label>
        </div>
        <br />
        <button className="btn-import" type="button" onClick={ouvrirModal}>
          Choisir une image
        </button>
        <button type="submit" className="form-cta-btn">
          <span className="form-cta-arrow left">→</span>
          <span className="form-cta-text">Confirmer</span>
          <span className="form-cta-arrow right">→</span>
        </button>
      </form>

      {modalOuvert && (
        <div className="modal-fond">
          <div className="modal-contenu">
            <button className="modal-fermer" onClick={fermerModal}>
              &times;
            </button>
            <h2>Banque publique</h2>
            <div className="grille-images">
              <img
                className="image-form-creation"
                src="../../../jpg/horreur1.jpg"
              />
              <img
                className="image-form-creation"
                src="../../../jpg/horreur2.jpg"
              />
              <img
                className="image-form-creation"
                src="../../../jpg/fantastique1.jpg"
              />
              <img
                className="image-form-creation"
                src="../../../jpg/fantastique2.jpg"
              />
              <img
                className="image-form-creation"
                src="../../../jpg/futuriste1.png"
              />
              <img
                className="image-form-creation"
                src="../../../jpg/futuriste2.jpg"
              />
            </div>
            <h3>Mes images</h3>

            <Link href="/importationImage">
              <button className="btn-import">
                Importer une image personnalisée
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreationForm;
