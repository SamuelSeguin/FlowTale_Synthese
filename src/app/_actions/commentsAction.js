"use server";

import { revalidatePath } from "next/cache";
import { AddComment, GetAllCommentsByStoryId } from "../_data/comments";
import { redirect } from "next/navigation";

export const GetAllCommentsByStoryIdAction = async (StoryId) => {
    const result = await GetAllCommentsByStoryId(StoryId);
    return result;
}

export const AddCommentAction = async (newComment) => {
    await AddComment(newComment);
    redirect(`/histoires/${newComment.storyId}`);
}