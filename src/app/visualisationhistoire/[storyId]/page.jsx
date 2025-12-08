// app/visualisationhistoire/[storyId]/page.jsx
import { redirect } from "next/navigation";
import { getStoryInfoById } from "@/app/_data/story";

const StoryStart = async ({ params }) => {
  const { storyId } = await params;
  const storyInfo = await getStoryInfoById(storyId);

  redirect(`/visualisationhistoire/${storyId}/${storyInfo.startNodeId}`);
};

export default StoryStart;
