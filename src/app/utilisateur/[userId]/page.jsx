import { GetStoryByUserIdAction } from "@/app/_actions/storyAction";
import NavBar from "../../_components/NavBar";
import Utilisateur from "../../_components/Utilisateur";

const UtilisateurPage = async ({ params }) => {
  const { userId } = params;
  const histoire = await GetStoryByUserIdAction(userId);
  return (
    <div>
      <NavBar />
      <Utilisateur histoire={histoire} />
    </div>
  );
};

export default UtilisateurPage;
