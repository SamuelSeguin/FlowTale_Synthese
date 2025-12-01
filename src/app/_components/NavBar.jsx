"use client";
import Link from "next/link";
import "./NavBar.css";

const NavBar = ({ user, auth = false}) => {

  return (
    <div className="nav">
      <Link href="/">
        <img className="logo" src="/svg/logo.png" alt="" />
      </Link>
      {auth === false ? (
        !user || user.length === 0 ? (
          <Link href="/auth/signin">
            <button className="nav-btn">
              <span className="nav-cta-arrow left">→</span>
              <span className="nav-cta-text">Authentification</span>
              <span className="nav-cta-arrow right">→</span>
            </button>
          </Link>
        ) : (
          <Link href={`/compte/${user.id}`}>
            <button className="nav-btn">
              <span className="nav-cta-arrow left">→</span>
              <span className="nav-cta-text">Compte</span>
              <span className="nav-cta-arrow right">→</span>
            </button>
          </Link>
        )
      ) : null}
    </div>
  );
};

export default NavBar;
