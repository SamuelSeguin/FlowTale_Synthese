import NavBar from "@/app/_components/NavBar";
import VisualisationHistoire from "@/app/_components/VisualisationHistoire";
import { getStoryInfoById, getNodeInfoById } from "@/app/_data/story";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const { storyId } = await params;
  const storyInfo = await getStoryInfoById(storyId);

  return {
    title: `${storyInfo.title} - Lecture`,
  };
}

const NodeView = async ({ params }) => {
  const { storyId, nodeId } = await params;

  const storyInfo = await getStoryInfoById(storyId);
  const nodeData = await getNodeInfoById(nodeId);

  const story = {
    id: storyInfo.id,
    titre: storyInfo.title,
    ambiance: storyInfo.ambiance,
    musique: storyInfo.musique,
  };

  const current = nodeData.node;
  const edges = nodeData.branches ?? [];
  const isStoryEnd = current?.is_ending === true;

  const session = await getSession();
  const user = session?.user ?? null;

  return (
    <div>
      <NavBar user={user} />
      <VisualisationHistoire
        story={story}
        current={current}
        edges={edges}
        storyId={storyId}
        isStoryEnd={isStoryEnd}
        startNodeId={storyInfo.startNodeId}
        user={user}
      />
    </div>
  );
};

export default NodeView;
