import { GetStoryById } from "@/app/_data/story";
import FicheHistoire from "../../_components/FicheHistoire";
import NavBar from "../../_components/NavBar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//Titre dynamique de l’onglet
export async function generateMetadata({ params }) {
  const { histoireId } = params;
  const histoires = await GetStoryById(histoireId); //Tableau
  const storyTitle = histoires[0];

export async function generateMetadata({ params }) {
  const { histoireId } = params;
  const histoires = await GetStoryById(histoireId); //Tableau
  const storyTitle = histoires[0];

  return {
    title: storyTitle.titre, //Titre de l’onglet
    title: storyTitle.titre, //Titre de l’onglet
  };
}

const FicheHistoirePage = async ({ params }) => {
  const { histoireId } = await params;
  const histoire = await GetStoryById(histoireId);
  console.log("HISTOIRE DANS FICHE HISTOIRE PAGE :", histoire);

  if (histoire === null || histoire.length === 0) {
    redirect("/404");
  }

  let user;

  try {
    const session = await getSession();
    user = session?.user;
    console.log("Vous êtes connecter!");
  } catch (err) {
    console.log("Vous n'êtes pas connecter!");
  }

  return (
    <div>
      <NavBar user={user} />
      <FicheHistoire histoire={histoire[0]} />
    </div>
  );
};

export default FicheHistoirePage;
