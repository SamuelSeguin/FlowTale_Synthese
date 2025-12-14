"use client";
import React, { useState, useRef, startTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import "./CreationHistoireForm.css";
import { CreationHistoireAction } from "../_actions/storyAction";
import Link from "next/link";
import { redirect } from "next/navigation";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const CreationForm = ({ user }) => {

  const [imageSelected, setImageSelected] = useState("/jpg/horreur1.jpg");

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
    // Récupérer les valeurs titre / synopsis / ambiance / animation
    const titre = formData.get("titre");
    const auteur = user.id;
    const synopsis = formData.get("synopsis");
    const ambiance = formData.get("ambiance");
    const musique = formData.get("musique");

    // Construction de l'objet histoire
    const newHistoireData = {
      id: uuidv4(),
      titre,
      auteur,
      auteurName: user.name,
      synopsis,
      ambiance,
      musique,
      image: imageSelected, // Valeur par défaut pour l'instant
    };

    console.log(newHistoireData);

    await CreationHistoireAction(newHistoireData);

    // Redirection vers la page de construction de l'histoire
    startTransition(() => {
      redirect(`construction_histoire/${newHistoireData.id}`);
    });
  };

  // Gestion du modal pour choisir une image
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

      {/* Formulaire de création d'histoire */}
      <form className="creation-form" action={CreationAction} ref={formRef}>
        <h2 className="titre-form-creation">Nouvelle histoire</h2>

        {/* Champ titre */}
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

        {/* Champ synopsis */}
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

        {/* Sélection ambiance et animation */}
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
                Animation
              </option>
              {/* <option value="fadein">Fade in</option> */}
              <option value="entreeChaotique">Entrée chaotique</option>
              <option value="glissement">Glissement</option>
              <option value="dechiffrage">Déchiffrage</option>
            </select>
          </label>
        </div>
        <br />

        {/* Bouton pour ouvrir le modal d'image */}
        <button className="btn-import" type="button" onClick={ouvrirModal}>
          Choisir une image
        </button>

        {/* Bouton de soumission du formulaire */}
        <button type="submit" className="form-cta-btn">
          <span className="form-cta-arrow left">→</span>
          <span className="form-cta-text">Confirmer</span>
          <span className="form-cta-arrow right">→</span>
        </button>
      </form>

      {/* Modal pour sélectionner ou importer une image */}
      {modalOuvert && (
        <div className="modal-fond">
          <div className="modal-contenu">
            <button className="modal-fermer" onClick={fermerModal}>
              &times;
            </button>

            <h2>Banque publique</h2>

            {/* Grille des images disponibles */}
            <div className="grille-images">
              <img
                className="image-form-creation"
                src="../../../jpg/horreur1.jpg"
                onClick={() => {
                  setImageSelected("/jpg/horreur1.jpg");
                  fermerModal();
                }}
              />
              <img
                className="image-form-creation"
                src="../../../jpg/horreur2.jpg"
                onClick={() => {
                  setImageSelected("/jpg/horreur2.jpg");
                  fermerModal();
                }}
              />
              <img
                className="image-form-creation"
                src="../../../jpg/fantastique1.jpg"
                onClick={() => {
                  setImageSelected("/jpg/fantastique1.jpg");
                  fermerModal();
                }}
              />
              <img
                className="image-form-creation"
                src="../../../jpg/fantastique2.jpg"
                onClick={() => {
                  setImageSelected("/jpg/fantastique2.jpg");
                  fermerModal();
                }}
              />
              <img
                className="image-form-creation"
                src="../../../jpg/futuriste1.png"
                onClick={() => {
                  setImageSelected("/jpg/futuriste1.png");
                  fermerModal();
                }}
              />
              <img
                className="image-form-creation"
                src="../../../jpg/futuriste2.jpg"
                onClick={() => {
                  setImageSelected("/jpg/futuriste2.jpg");
                  fermerModal();
                }}
              />
            </div>

            {/* Option pour importer ses propres images */}
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
