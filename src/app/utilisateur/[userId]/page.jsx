import { GetStoryByUserIdAction } from "@/app/_actions/storyAction";
import NavBar from "../../_components/NavBar";
import Utilisateur from "../../_components/Utilisateur";
import { getSession } from "@/lib/auth";

const UtilisateurPage = async ({ params }) => {
  const { userId } = params;
  const histoire = await GetStoryByUserIdAction(userId);

  let user;

  try {
    const session = await getSession();
    user = session?.user;
    console.log("Vous êtes connecter!")
  } catch (err) {
    console.log("Vous n'êtes pas connecter!")
  }

  return (
    <div>
      <NavBar user={user}/>
      <Utilisateur histoire={histoire} />
    </div>
  );
};

export default UtilisateurPage;
