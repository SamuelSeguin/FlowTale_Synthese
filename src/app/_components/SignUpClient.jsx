"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import "./SignUpClient.css";
import { redirect } from "next/dist/server/api-utils";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

const SignUpClient = () => {
  const containerRef = useRef();
  const messageRef = useRef();
  const router = useRouter();

  useGSAP(() => {
    gsap.from(messageRef.current, {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: "power3.out",
    });
  });

  const InscriptionAction = async (formData) => {
    // Récupérer les trois valeurs, username / email / password
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    // Validation Client

    // AuthClient SignUp
    const result = await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: (data) => {
          router.push("/auth/signin");
        },
        onError: (err) => {
          console.log(err, "SIGNUP ERROR");
        },
      }
    );

    console.log(result);
  };

  return (
    <div>
      <div className="signup-left-message" ref={messageRef}>
        <p>
          Créez un compte et <span>donnez vie</span> à vos{" "}
          <span>histoires</span>.
        </p>
      </div>

      <div ref={containerRef}>
        <AuthForm
          titre={"Créez votre compte"}
          callActionTitre={"S'inscrire"}
          showName={true}
          formAction={InscriptionAction}
        >
          <p className="text-signin">
            Vous avez déjà un compte ? <a href="/auth/signin">Se connecter</a>
          </p>
        </AuthForm>
      </div>
    </div>
  );
};

export default SignUpClient;
