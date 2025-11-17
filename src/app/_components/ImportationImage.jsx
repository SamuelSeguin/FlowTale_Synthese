"use client";
import "./ImportationImage.css";

const ImportationImage = () => {
  return (
    <div className="content-flex">
      <div>
        <div>
          <img src="/png/import.png" alt="" />
          <p>Téléverser vos images.</p>
        </div>
        <button>Commencer</button>
      </div>
    </div>
  );
};

export default ImportationImage;
