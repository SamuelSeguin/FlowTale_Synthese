"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import "./SignUpClient.css";

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
    });

    console.log(result);
  };

  return (
    <AuthForm
      titre={"Inscription"}
      callActionTitre={"S'inscrire"}
      showName={true}
      formAction={InscriptionAction}
    >
      <p className="text-center text-sm text-gray-600">
        Vous avez un compte ?{" "}
        <a href="/auth/signin" className="text-blue-600 hover:underline">
          Connectez-vous
        </a>
      </p>
    </AuthForm>
  );
};

export default SignUpClient;
