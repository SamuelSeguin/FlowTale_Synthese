"use server"

import { revalidatePath } from "next/cache";
import { AddNodes, GetAllNodes, RemoveNodes, UpdateNodes } from "../_data/nodes";

export const GetAllNodesAction = async () => {
    const result = await GetAllNodes();
    return result;
}

export const GetNodesByStoryIdAction = async (StoryId) => {
    const result = await GetNodesByStoryId(StoryId);
    return result;
}

export const AddNodesAction = async (NewNode) => {
    /* ID, PosX, PosY, Data: { Label }, StoryId, CreatedAt */
    await AddNodes(NewNode);
    revalidatePath('/');
}

export const RemoveNodesAction = async (NodeId) => {
    await RemoveNodes(NodeId);
    revalidatePath('/');
}

export const UpdateNodesAction = async (NodeId, Pos) => {
    await UpdateNodes(NodeId, Pos);
    revalidatePath('/');
}