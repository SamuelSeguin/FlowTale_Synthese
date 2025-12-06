import SignInClient from "@/app/_components/SignInClient";
import NavBar from "../../_components/NavBar";

export const metadata = {
  title: "Se connecter",
};

const SignInPage = () => {
  return (
    <div>
      <NavBar />
      <SignInClient />
    </div>
  );
};

export default SignInPage;
