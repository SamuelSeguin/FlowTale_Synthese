"use server"

import { CreationHistoire, GetAllStories, GetFullStoryById, GetStoryById, GetStoryByUserId, UpdatePublicStoryById } from "../_data/story"
import { revalidatePath } from "next/cache";

export const CreationHistoireAction = async (histoireData) => {
    await CreationHistoire(histoireData);
    revalidatePath(`/constructionHistoire/${histoireData.id}`);
}

export const GetAllStoriesAction = async () => {
    const result = await GetAllStories();
    return result;
}

export const GetStoryByUserIdAction = async (userId) => {
    const result = await GetStoryByUserId(userId);
    return result;
}

export const GetStoryByIdAction = async (storyId) => {
    const result = await GetStoryById(storyId);
    return result;
}

export const GetFullStoryByIdAction = async (storyId) => {
    const result = await GetFullStoryById(storyId) ;
    return result;
}

export const UpdatePublicStoryByIdAction = async (storyId, userId, publicValue) => {
    await UpdatePublicStoryById(storyId, publicValue);
    revalidatePath(`/compte/${userId}`)
}