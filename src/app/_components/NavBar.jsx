"use client";
import Link from "next/link";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <Link href="/">
        <img className="logo" src="/svg/logo.png" alt="" />
      </Link>
      <Link href="/creationHistoire">
      <button className="nav-btn">
        <span className="nav-cta-arrow left">→</span>
        <span className="nav-cta-text">Créer</span>
        <span className="nav-cta-arrow right">→</span>
      </button>
      </Link>
    </div>
  );
};

export default NavBar;
