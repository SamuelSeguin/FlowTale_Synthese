"use server"
import { v4 as uuidv4 } from "uuid";

import {
    CreationHistoire,
    getPublishedStories,
    getStoryInfoById,
    getNodeInfoById,
    GetFullStoryById,
    GetStoryById,
    GetStoryByUserId,
    UpdatePublicStoryById,
    DeleteStoryById,
} from "../_data/story"
import { revalidatePath } from "next/cache";
import { AddNodes } from "../_data/nodes";

export const CreationHistoireAction = async (histoireData) => {
    await CreationHistoire(histoireData);

    const startNode = {
    id: uuidv4(),
    positionX: 0,
    positionY: 0,
    data: JSON.stringify({
      type: "Début",
      label: "Début de l'histoire",
      description: "Ceci est le noeud de départ de votre histoire.",
    }),
    storyId: histoireData.id,
  };

  await AddNodes(startNode);

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

export const DeleteStoryByIdAction = async (storyId, userId) => {
    await DeleteStoryById(storyId);
    revalidatePath(`/compte/${userId}`);
}