import NavBar from "../../../_components/NavBar";
import Comments from "../../../_components/Comments";
import { GetFullStoryByIdAction } from "@/app/_actions/storyAction";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

///Titre dynamique de l’onglet
export async function generateMetadata({ params }) {
  const { histoireId } = params;
  const storyData = await GetFullStoryByIdAction(histoireId);

  return {
    title: `${storyData.titre} - Commentaires`,
  };
}

const CommentairesPage = async ({ params }) => {
  const { histoireId } = await params;
  console.log("HISTOIRE ID DANS PAGE COMMENTAIRES :", histoireId);

  const storyData = await GetFullStoryByIdAction(histoireId);
  console.log("[STORY DATA COMPLETE]", storyData);

  let user;

  try {
    const session = await getSession();
    console.log("[USER SESSION]", session);
    user = session?.user;
    if (user.id !== storyData.auteur || !user) {
      redirect("/auth/signin");
    }
  } catch (err) {
    console.log("[ERROR SESSION USER]", err);
    redirect("/auth/signin");
  }

  return (
    <div>
      <NavBar user={user} />
      <Comments />
    </div>
  );
};

export default CommentairesPage;
