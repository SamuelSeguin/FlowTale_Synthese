import { GetAllNodesAction } from "@/app/_actions/nodesAction";
import NavBar from "../../_components/NavBar";
import { GetAllEdgesAction } from "@/app/_actions/edgesAction";
import MainPageClient from "@/app/_components/MainPageClient";
import { GridProvider } from "@/app/_contexts/gridContext";
import { redirect } from "next/navigation";
import "../../_components/ConstructionHistoire.css";

const ConstructionHistoirePage = async ({ params }) => {
  let user;

  try {
    const session = await getSession();
    console.log("[USER SESSION]", session);
    user = session?.user;
    if (!user) {
      // redirect("/auth/signin");
    }
  } catch (err) {
    // redirect("/auth/signin");
  }

  const { histoireId } = params;
  console.log("[HISTOIRE ID]", histoireId);

  const nodeData = await GetAllNodesAction();
  console.log("[NODES RECUPERES]", nodeData);

  const initialNodes = nodeData.map((node) => ({
    id: node.id,
    position: { x: node.positionX, y: node.positionY },
    data: JSON.parse(node.data),
  }));

  const edgeData = await GetAllEdgesAction();
  console.log("[EDGES RECUPERES]", edgeData);

  const initialEdges = edgeData.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: edge.data,
  }));

  return (
    <div className="construction-page-container">
      <NavBar />
      <div>
        <GridProvider
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          storyId={histoireId}
        >
          <main>
            <h1 className="construction-page-titre">Titre de l'histoire</h1>
            <MainPageClient nodeData={initialNodes} />
          </main>
        </GridProvider>
      </div>
    </div>
  );
};

export default ConstructionHistoirePage;
