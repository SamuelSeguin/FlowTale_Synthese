import NavBar from "../../_components/NavBar";
import CompteCreateur from "../../_components/CompteCreateur";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GetStoryByUserIdAction } from "@/app/_actions/storyAction";

//Titre dynamique de l’onglet
export const metadata = {
  title: "Mon compte",
};

const ComptePage = async () => {
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

  const story = await GetStoryByUserIdAction(user.id);
  console.log("STORY IN COMPTE PAGE", story);

  return (
    <div>
      <NavBar userID={user.id} />
      <CompteCreateur user={user} story={story} />
    </div>
  );
};

export default ComptePage;
