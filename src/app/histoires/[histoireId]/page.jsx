// import { GetStoryById } from "@/app/_data/story";
import { getStoryInfoById } from "@/app/_data/story";
import FicheHistoire from "../../_components/FicheHistoire";
import NavBar from "../../_components/NavBar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//Titre dynamique de l’onglet
export async function generateMetadata({ params }) {
  const { histoireId } = params;
  const histoire = await getStoryInfoById(histoireId);
  return {
    title: histoire.titre,
  };
}

const FicheHistoirePage = async ({ params }) => {
  const { histoireId } = await params;

  const histoire = await getStoryInfoById(histoireId);

  if (histoire === null || histoire.length === 0) {
    redirect("/404");
  }

  let user;

  try {
    const session = await getSession();
    user = session?.user;
    console.log("Vous êtes connecté!");
  } catch (err) {
    console.log("Vous n'êtes pas connecté!");
  }

  return (
    <div>
      <NavBar user={user} />
      <FicheHistoire histoire={histoire} />
    </div>
  );
};

export default FicheHistoirePage;
