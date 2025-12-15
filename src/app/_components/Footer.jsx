"use client";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-container-flex">
        <img className="footer-logo" src="/png/logo-footer.png" alt="Logo Flowtale" />
        <p className="footer-text">
          Application réalisée par Émilie Paquin et Samuel Séguin
        </p>
      </div>
    </div>
  );
};

export default Footer;
