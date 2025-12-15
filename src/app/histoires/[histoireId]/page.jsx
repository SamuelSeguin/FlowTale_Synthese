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

  return {
    title: storyTitle.titre, //Titre de l’onglet
  };
}

const FicheHistoirePage = async ({ params }) => {
  const rawId = params.histoireId;

  const histoireId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!histoireId || typeof histoireId !== "string") {
    redirect("/404");
  }

  const histoire = await GetStoryById(histoireId);

  if (!histoire || histoire.length === 0) {
    redirect("/404");
  }

  let user = null;
  try {
    const session = await getSession();
    user = session?.user;
  } catch {}

  return (
    <div>
      <NavBar user={user} />
      <FicheHistoire histoire={histoire[0]} />
    </div>
  );
};

export default FicheHistoirePage;