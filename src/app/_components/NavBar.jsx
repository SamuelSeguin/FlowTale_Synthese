"use client";
import Link from "next/link";
import "./NavBar.css";
import { useAudio } from "../_contexts/AudioContext";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const NavBar = ({ user, auth = false }) => {
  const isLoggedIn = !!user;
  const { stop } = useAudio(false);

  const router = useRouter();

  const localDisconnect = async () => {
    await authClient.signOut({
      fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
        },
      },
    });
  }

  return (
    <div className="nav">
      <Link href="/">
        <img className="logo" src="/png/logo.png" alt="Logo Flowtale" />
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
            <img onClick={localDisconnect} className="img-logout" src="/png/logout.png" alt="" />
          </div>
        )
      ) : null}
    </div>
  );
};

export default NavBar;
