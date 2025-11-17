"use client";
import "./CreationHistoireForm.css";

const CreationForm = () => {
  const CreationAction = async (formData) => {
    // Récupérer les trois valeurs, titre / synopsis / ambiance / animation / musique
    const titre = formData.get("titre");
    const synopsis = formData.get("synopsis");
    const ambiance = formData.get("ambiance");
    const animation = formData.get("animation");
    const musique = formData.get("musique");

    console.log(titre, synopsis, ambiance, animation, musique);
  };

  return (
    <div className="form-background">
      <div className="creation-left-message">
        <p>
          Imagine. <br /> Anime. <br /> Partage.
        </p>
      </div>

      <form className="creation-form">
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
            <select className="select" name="ambiance" required>
              <option value="">Ambiance</option>
              <option value="mystérieuse">Horreur</option>
              <option value="énergique">Fantastique</option>
              <option value="calme">Romance</option>
            </select>
          </label>
          <br />

          <label>
            <select className="select" name="animation" required>
              <option value="">
                Animation
              </option>
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="bounce">Bounce</option>
              <option value="zoom">Zoom</option>
            </select>
          </label>
          <br />

          <label>
            <select className="select" name="musique" required>
              <option value="">
                Musique
              </option>
              <option value="classique">Classique</option>
              <option value="electro">Electro</option>
            </select>
          </label>
        </div>
        <br />
        <button type="submit" className="form-cta-btn">
          <span className="form-cta-arrow left">→</span>
          <span className="form-cta-text">Confirmer</span>
          <span className="form-cta-arrow right">→</span>
        </button>
      </form>
    </div>
  );
};

export default CreationForm;
