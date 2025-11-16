"use client";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <img className="logo" src="/svg/logo.svg" alt="" />
      <button className="nav-btn">
        <span className="nav-cta-arrow left">→</span>
        <span className="nav-cta-text">Créer</span>
        <span className="nav-cta-arrow right">→</span>
      </button>
    </div>
  );
};

export default NavBar;
