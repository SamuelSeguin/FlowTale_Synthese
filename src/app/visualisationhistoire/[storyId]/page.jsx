// app/visualisationhistoire/[storyId]/page.jsx
import { redirect } from "next/navigation";
import { getStoryInfoById } from "@/app/_data/story";

const StoryStart = async ({ params }) => {
  const { storyId } = await params;
  const storyInfo = await getStoryInfoById(storyId);

  if (!storyInfo || !storyInfo.startNodeId) {
    redirect("/404");
  }

  redirect(`/visualisationhistoire/${storyId}/${storyInfo.startNodeId}`);
};

export default StoryStart;
