"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import "./SignUpClient.css";
import { redirect } from "next/dist/server/api-utils";

const SignUpClient = () => {
  const InscriptionAction = async (formData) => {
    // Récupérer les trois valeurs, username / email / password
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    // Validation Client

    // AuthClient SignUp
    const result = await authClient.signUp.email({
      email,
      name,
      password,
      callbackURL: "/",
    }, {
      onSuccess: (ctx) => {
        redirect("/auth/signin");
      }
    });

    console.log(result);
  };

  return (
    <div>
      <div className="signup-left-message">
        <p>
          Créez un compte et <span>donnez vie</span> à vos{" "}
          <span>histoires</span>.
        </p>
      </div>

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
  );
};

export default SignUpClient;
