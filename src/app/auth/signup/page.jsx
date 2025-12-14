import SignUpClient from "@/app/_components/SignUpClient";
import NavBar from "../../_components/NavBar";

export const metadata = {
  title: "Créer un compte",
};

const SignUpPage = () => {
  return (
    <div>
      <NavBar />
      <SignUpClient />
    </div>
  );
};

export default SignUpPage;
