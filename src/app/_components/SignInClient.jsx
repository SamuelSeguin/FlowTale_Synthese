"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import "./SignInClient.css";

const SignInClient = () => {
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
      <div className="signin-left-message">
        <p>
          Connectez-vous et <span>donnez vie</span> à vos <span>histoires</span>
          .
        </p>
      </div>

      <AuthForm
        titre={"Bienvenue à nouveau !"}
        callActionTitre={"Se connecter"}
        showName={false}
        formAction={ConnexionAction}
      >
        <p>
          Vous n'avez pas de compte ? <a href="/auth/signup">Inscrivez-vous</a>
        </p>
      </AuthForm>
    </div>
  );
};

export default SignInClient;
