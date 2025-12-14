"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import "./SignInClient.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SignInClient = () => {
  const containerRef = useRef();
  const messageRef = useRef();

  useGSAP(() => {
    gsap.from(messageRef.current, {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: "power3.out",
    });
  });

  const signInWithGithub = () => {
  authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
  });
};

  const ConnexionAction = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    console.log(result);
  };

  return (
    <div>
      <div className="signin-left-message" ref={messageRef}>
        <p>
          Connectez-vous et <span>donnez vie</span> à vos <span>histoires</span>
          .
        </p>
      </div>
      <div ref={containerRef}>
        <AuthForm
          titre={"Bienvenue à nouveau !"}
          callActionTitre={"Se connecter"}
          showGithub={true}
          showName={false}
          formAction={ConnexionAction}
        >
          <p className="text-signup">
            Vous n'avez pas de compte ? <a href="/auth/signup">S'inscrire</a>
          </p>
        </AuthForm>
      </div>
    </div>
  );
};

export default SignInClient;
