"use client";
import Link from "next/link";
import "./Page404.css";

const Page404 = () => {
  return (
    <div>
      <div className="content-flex">
        <img src="/png/404.png" alt="" />
        <p>Cette page n'existe pas... encore.</p>
        <Link href="/accueil">
        <button className="page404-cta-btn">
          <span className="page404-cta-arrow left">→</span>
          <span className="page404-cta-text">Retour aux histoires</span>
          <span className="page404-cta-arrow right">→</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
