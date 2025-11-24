"use server"

import { CreationHistoire, GetAllStories, GetStoryByUserId } from "../_data/story"
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
    const result = console.log(`Récupération de l'histoire avec l'ID ${storyId}`);
    return result;
}

export const GetNodeInfoByStoryAction = async (nodeId) => {
  
}