import { GetFullStoryByIdAction } from "@/app/_actions/storyAction";
import NavBar from "../../../_components/NavBar";
import VisualisationHistoire from "../../../_components/VisualisationHistoire";

const HistoireVisualisationPage = async ({ params }) => {
    const { histoireId } = await params;
  console.log("[HISTOIRE ID VISUALISATION]", histoireId);

  const storyInfo = await GetFullStoryByIdAction(histoireId);
  console.log("[HISTOIRE INFO]", storyInfo)

  return (
    <div>
      <NavBar />
      <VisualisationHistoire story={storyInfo}/>
    </div>
  );
};

export default HistoireVisualisationPage;
