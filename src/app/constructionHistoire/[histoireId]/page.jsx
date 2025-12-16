import { GetAllNodesAction } from "@/app/_actions/nodesAction";
import NavBar from "../../_components/NavBar";
import { GetAllEdgesAction } from "@/app/_actions/edgesAction";
import MainPageClient from "@/app/_components/MainPageClient";
import { GridProvider } from "@/app/_contexts/gridContext";
import { redirect } from "next/navigation";
import "../../_components/ConstructionHistoire.css";
import {
  GetFullStoryByIdAction,
  GetStoryByIdAction,
} from "@/app/_actions/storyAction";
import { getSession } from "@/lib/auth";

//Titre dynamique de l’onglet
export async function generateMetadata({ params }) {
  const { histoireId } = await params;
  const storyData = await GetFullStoryByIdAction(histoireId);

  return {
    title: `Construction - ${storyData.titre}`,
  };
}

const ConstructionHistoirePage = async ({ params }) => {
  const { histoireId } = await params;

  const storyData = await GetFullStoryByIdAction(histoireId);

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

  const nodeData = storyData.nodes;

  const initialNodes = nodeData.map((node) => ({
    id: node.id,
    position: { x: node.positionX, y: node.positionY },
    data: JSON.parse(node.data),
  }));

  const edgeData = storyData.edges;

  const initialEdges = edgeData.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: edge.data,
  }));

  return (
    <div className="construction-page-container">
      <NavBar user={user} />
      <div>
        <GridProvider
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          storyId={histoireId}
        >
          <main>
            <h1 className="construction-page-titre">{storyData.titre}</h1>
            <MainPageClient nodeData={initialNodes} storyId={histoireId} />
          </main>
        </GridProvider>
      </div>
    </div>
  );
};

export default ConstructionHistoirePage;
