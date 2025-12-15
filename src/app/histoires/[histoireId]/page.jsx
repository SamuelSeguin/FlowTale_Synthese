import { GetStoryById } from "@/app/_data/story";
import FicheHistoire from "../../_components/FicheHistoire";
import NavBar from "../../_components/NavBar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//Titre dynamique de l’onglet
export function generateMetadata() {
  return {
    title: "Histoire | FlowTale",
  };
}

const FicheHistoirePage = async ({ params }) => {
  const storyID = params.histoireId;

  if (!storyID) {
    redirect("/404");
  }

  const histoire = await GetStoryById(storyID);

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