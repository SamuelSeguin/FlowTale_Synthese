"use server";

import { redirect } from "next/navigation";
import { AddComment, GetAllCommentsByStoryId } from "../_data/comments";

export const GetAllCommentsByStoryIdAction = async (StoryId) => {
    const result = await GetAllCommentsByStoryId(StoryId);
    return result;
}

export const AddCommentAction = async (commentData) => {
    await AddComment(commentData);
    console.log("REDIRECTION");
    redirect(`/histoires/${commentData.storyId}`);
}