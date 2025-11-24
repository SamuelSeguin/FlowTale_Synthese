import NavBar from "../_components/NavBar";
import CreationHistoireForm from "../_components/CreationHistoireForm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreationHistoirePage = async () => {

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

  return (
    <div>
      <NavBar />
      <CreationHistoireForm user={user} />
    </div>
  );
};

export default CreationHistoirePage;
