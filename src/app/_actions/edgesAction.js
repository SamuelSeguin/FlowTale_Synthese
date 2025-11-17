"use server"

import { revalidatePath } from "next/cache"
import { AddEdges, GetAllEdges, RemoveEdges } from "../_data/edges";

export const GetAllEdgesAction = async () => {
    const result = await GetAllEdges();
    return result;
}

export const GetEdgesByStoryIdAction = async (StoryId) => {
    const result = console.log(`Récupération des edges pour l'histoire ${StoryId}`);
    return result;
}

export const AddEdgesAction = async (newEdge) => {
    // ID, Source, Target, Data, *StoryId*, CreatedAt
    await AddEdges(newEdge);
    revalidatePath("/");
}

export const RemoveEdgesAction = async (EdgeId) => {
    await RemoveEdges(EdgeId);
    revalidatePath("/");
}

export const UpdateEdgesAction = async () => {
    const result = console.log("Mise à jour des edges");
    revalidatePath("/");
    return result;
}