"use client";
import "./ImportationImage.css";

const ImportationImage = () => {
  return (
    <div className="background">
      <div className="import-container">
        <div className="content-flex">
          <div>
            <div>
              <img
                className="img-import"
                src="/png/import.png"
                alt="Icône import"
              />
              <p className="txt-import">Téléverser vos images.</p>
            </div>
          </div>
        </div>
        <button className="import-cta-btn">
          <span className="import-cta-arrow left">→</span>
          <span className="import-cta-text">Commencer</span>
          <span className="import-cta-arrow right">→</span>
        </button>
      </div>
    </div>
  );
};

export default ImportationImage;
