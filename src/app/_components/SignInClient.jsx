"use client"
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";

const SignInClient = () => {

    const ConnexionAction = async (formData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        const result = await authClient.signIn.email({
            email,
            password,
            callbackURL: '/'
        });

        console.log(result);
    }

    return (
            <AuthForm
                titre={"Connexion"}
                callActionTitre={"Se connecter"}
                showName={false}
                formAction={ConnexionAction}
            >
                <p className="text-center text-sm text-gray-600">
                    Vous n'avez pas de compte ?{" "}
                    <a href="/auth/signup" className="text-blue-600 hover:underline">
                        Inscrivez-vous
                    </a>
                </p>
            </AuthForm>
    );
}

export default SignInClient;