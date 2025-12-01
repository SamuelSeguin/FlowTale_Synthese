import { GetStoryById } from "@/app/_data/story";
import FicheHistoire from "../../_components/FicheHistoire";
import NavBar from "../../_components/NavBar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const FicheHistoirePage = async ({ params }) => {
  const { histoireId } = await params;
  const histoire = await GetStoryById(histoireId);
  console.log("HISTOIRE DANS FICHE HISTOIRE PAGE :", histoire);

  if (histoire === null || histoire.length === 0) {
    redirect("/404");
  }

  return (
    <div>
      <NavBar />
      <FicheHistoire histoire={histoire[0]}  />
    </div>
  );
};

export default FicheHistoirePage;
