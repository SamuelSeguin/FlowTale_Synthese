import { GetStoryById } from "@/app/_data/story";
import FicheHistoire from "../../_components/FicheHistoire";
import NavBar from "../../_components/NavBar";
import { getSession } from "@/lib/auth";

const FicheHistoirePage = async ({ params }) => {
  const { histoireId } = await params;
  const histoire = await GetStoryById(histoireId);
  let user;

  try {
    const session = await getSession();
    user = session?.user;
    if (!user) {
      redirect("/auth/signin");
    }
  } catch (err) {
    redirect("/auth/signin");
  }

  if (!histoire) {
    redirect("/404");
  }

  return (
    <div>
      <NavBar />
      <FicheHistoire histoire={histoire[0]} user={user} />
    </div>
  );
};

export default FicheHistoirePage;
