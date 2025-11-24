
import { GetAllStoriesAction } from "../_actions/storyAction";
import Accueil from "../_components/Accueil";
import NavBar from "../_components/NavBar";

const AccueilPage = async () => {
  const story = await GetAllStoriesAction();
  
  return (
    <>
      <NavBar />
      <Accueil story={story} />
    </>
  );
};

export default AccueilPage;
