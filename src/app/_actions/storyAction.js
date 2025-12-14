"use server"

import {
    CreationHistoire,
    getPublishedStories,
    getStoryInfoById,
    getNodeInfoById,
    GetFullStoryById,
    GetStoryById,
    GetStoryByUserId,
    UpdatePublicStoryById,
    deleteStory,
} from "../_data/story"
import { revalidatePath } from "next/cache";

export const CreationHistoireAction = async (histoireData) => {
    await CreationHistoire(histoireData);
    revalidatePath(`/constructionHistoire/${histoireData.id}`);
}

export const GetAllStoriesAction = async () => {
    const result = await GetAllStories();
    return result;
}

export const getPublishedStoriesAction = async () => {
    return getPublishedStories();
};

export const getStoryInfoByIdAction = async (storyId) => {
    return getStoryInfoById(storyId);
};

export const getNodeInfoByIdAction = async (nodeId) => {
    return getNodeInfoById(nodeId);
};

export const GetStoryByUserIdAction = async (userId) => {
    const result = await GetStoryByUserId(userId);
    return result;
}

export const GetStoryByIdAction = async (storyId) => {
    const result = await GetStoryById(storyId);
    return result;
}

export const GetFullStoryByIdAction = async (storyId) => {
    const result = await GetFullStoryById(storyId);
    return result;
}

export const UpdatePublicStoryByIdAction = async (storyId, userId, publicValue) => {
    await UpdatePublicStoryById(storyId, publicValue);
    revalidatePath(`/compte/${userId}`)
}

export const deleteStoryAction = async (storyId, userId) => {
    await deleteStory(storyId);
    revalidatePath(`/compte/${userId}`);
}