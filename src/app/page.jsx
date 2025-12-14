import { getSession } from "@/lib/auth";

// -- NEW --
// import { GetAllStoriesAction } from "./_actions/storyAction";
import { getPublishedStoriesAction } from "./_actions/storyAction";
import Accueil from "./_components/Accueil";
import NavBar from "./_components/NavBar";

export const metadata = {
  title: "FlowTale",
  description: "Projet synthèse - Web 5",
};

const HomePage = async () => {
  if (!process.env.BETTER_AUTH_SECRET?.trim()) {
    console.log(
      "[ASSUREZ-VOUS DE FOURNIR UN BETTER_AUTH_SECRET DANS LE FICHIER .ENV]",
      "https://www.better-auth.com/docs/installation"
    );

    // DB: GENERATE
    // DB: MIGRATE
    // .ENV.LOCAL
    // .ENV.PROD
  }

  let user;

  try {
    const session = await getSession();
    user = session?.user;
    console.log("Vous êtes connecter!")
  } catch (err) {
    console.log("Vous n'êtes pas connecter!")
  }

  // -- NEW --
  // const story = await GetAllStoriesAction();
  const stories = await getPublishedStoriesAction();

  return (
    <>
      <NavBar user={user} />
      <Accueil stories={stories} />
    </>
  );
};
export default HomePage;
