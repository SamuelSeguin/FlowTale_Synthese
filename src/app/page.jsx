import { GetAllEdgesAction } from "./_actions/edgesAction";
import { GetAllNodesAction } from "./_actions/nodesAction";
import MainPageClient from "./_components/MainPageClient";
import { GridProvider } from "./_context/gridContext";

export const metadata = {
  title: "Web 5",
  description: "Gabarit de départ - Web 5",
};

const HomePage = async () => {
  if (!process.env.BETTER_AUTH_SECRET?.trim()) {
    console.log(
      "[ASSUREZ-VOUS DE FOURNIR UN BETTER_AUTH_SECRET DANS LE FICHIER .ENV]",
      "https://www.better-auth.com/docs/installation"
    );

    // DB: GENERATE
    // DB: MIGRATE
    // .ENV.LOCAL
    // .ENV.PROD
  }

  const nodeData = await GetAllNodesAction();
  console.log("[NODES RECUPERES]", nodeData);

  const initialNodes = nodeData.map(node => ({
    id: node.id,
    position: { x: node.positionX, y: node.positionY },
    data: JSON.parse(node.data),
  }));

  const edgeData = await GetAllEdgesAction();
  console.log("[EDGES RECUPERES]", edgeData);

  const initialEdges = edgeData.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: edge.data,
  }));

  // Consulter la composante GridProvider

  return (
    <GridProvider initialNodes={initialNodes} initialEdges={initialEdges}>
      <main className="flex flex-col items-center justify-center gap-2 py-5">
        <h1>Gabarit de départ</h1>
        <MainPageClient />
      </main>
    </GridProvider>
  );
};
export default HomePage;
