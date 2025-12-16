"server-only"

import { db } from "@/db";
import { edgesTables } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const GetAllEdges = async () => {
    try {
        const result = await db.select().from(edgesTables);
        return result;
    } catch (err) {
        console.log("[GET ALL EDGES ERROR]", err);
        throw err;
    }
}

export const GetEdgesByStoryId = async (storyId) => {
    return;
}

export const AddEdges = async (newEdge) => {
    try {
        const result = await db.insert(edgesTables).values(newEdge);
        return result;
    } catch (err) {
        console.log("[CREATE EDGE ERROR]", err);
        throw err;
    }
}

export const RemoveEdges = async (EdgeId) => {
    try {
        const result = await db.delete(edgesTables).where(eq(edgesTables.id, EdgeId));
        return result;
    } catch (err) {
        console.log("[DELETE EDGE ERROR]", err);
        throw err;
    }
}

export const UpdateEdges = async (newEdgeInfo) => {
    try {
        const result = await db.update(edgesTables).set({
            data: JSON.stringify(newEdgeInfo.data),
        }).where(eq(edgesTables.id, newEdgeInfo.id));
        return result;
    } catch (err) {
        console.log("[UPDATE EDGE ERROR]", err);
        throw err;
    }
}