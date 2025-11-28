"use server";

import { revalidatePath } from "next/cache";
import { GetAllCommentsByStoryId } from "../_data/comments";

export const GetAllCommentsByStoryIdAction = async (StoryId) => {
    await GetAllCommentsByStoryId(StoryId);
    revalidatePath(`/histoires/${StoryId}/stats`);
}