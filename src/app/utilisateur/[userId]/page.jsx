import { GetStoryByUserIdAction } from "@/app/_actions/storyAction";
import NavBar from "../../_components/NavBar";
import Utilisateur from "../../_components/Utilisateur";
import { getSession } from "@/lib/auth";

import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";

//Titre de l’onglet
export async function generateMetadata({ params }) {
  const { userId } = await params;

  const users = await db.select().from(user).where(eq(user.id, userId));

  const auteur = users[0];

  return {
    title: auteur.name,
  };
}

const UtilisateurPage = async ({ params }) => {
  const { userId } = await params;
  const histoire = await GetStoryByUserIdAction(userId);

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
      <Utilisateur histoire={histoire} />
    </div>
  );
};

export default UtilisateurPage;
