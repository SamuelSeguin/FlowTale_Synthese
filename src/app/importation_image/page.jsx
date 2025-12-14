import NavBar from "../_components/NavBar";
import ImportationImage from "../_components/ImportationImage";
import { getSession } from "@/lib/auth";

const ImportationImagePage = async () => {

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
      <NavBar user={user}/>
      <ImportationImage />
    </div>
  );
};

export default ImportationImagePage;
