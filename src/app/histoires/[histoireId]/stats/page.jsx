import NavBar from "../../../_components/NavBar";
import Comments from "../../../_components/Comments";
import { GetFullStoryByIdAction } from "@/app/_actions/storyAction";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { GetAllCommentsByStoryIdAction } from "@/src/app/_actions/commentsAction";

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

  const commentData = await GetAllCommentsByStoryIdAction(histoireId);
  console.log("COMMENTAIRES RECUPERES DANS PAGE COMMENTAIRES :", commentData);

  const storyData = await GetFullStoryByIdAction(histoireId);
  console.log("[STORY DATA COMPLETE]", storyData);

  let user;

  try {
    const session = await getSession();
    user = session?.user;
    if (user.id !== storyData.auteur || !user) {
      redirect("/auth/signin");
    }
  } catch (err) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <NavBar user={user} />
      <Comments comments={commentData} storyTitle={storyData.titre} user={user}/>
    </div>
  );
};

export default CommentairesPage;
