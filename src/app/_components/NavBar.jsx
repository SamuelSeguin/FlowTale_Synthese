"use client";
import Link from "next/link";
import "./NavBar.css";

const NavBar = ({ user, auth = false }) => {
  const isLoggedIn = !!user;

  return (
    <div className="nav">
      <Link href="/">
        <img className="logo" src="/svg/logo.png" alt="" />
      </Link>
      {auth === false ? (
        !isLoggedIn ? (
          <Link href="/auth/signin">
            <button className="nav-btn">
              <span className="nav-cta-arrow left">→</span>
              <span className="nav-cta-text">Se connecter</span>
              <span className="nav-cta-arrow right">→</span>
            </button>
          </Link>
        ) : (
          <div className="nav-flex">
            <Link href={`/compte/${user.id}`}>
              <button className="nav-btn">
                <span className="nav-cta-arrow left">→</span>
                <span className="nav-cta-text">Compte</span>
                <span className="nav-cta-arrow right">→</span>
              </button>
            </Link>
            <img className="img-logout" src="/png/logout.png" alt="" />
          </div>
        )
      ) : null}
    </div>
  );
};

export default NavBar;
