"use client";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-container-flex">
        <img className="footer-logo" src="/svg/logo.png" alt="" />
        <p className="footer-text">
          Application réalisée par Émilie Paquin et Samuel Séguin
        </p>
      </div>
    </div>
  );
};

export default Footer;
