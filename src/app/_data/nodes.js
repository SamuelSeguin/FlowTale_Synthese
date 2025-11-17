"server-only"

import { db } from "@/db";
import { nodesTables } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const GetAllNodes = async () => {
    try {
        const result = await db.select().from(nodesTables);
        return result;
    }
    catch (err) {
        console.log("[GET ALL NODES ERROR]", err);
        throw err;
    }
}

export const GetNodesByStoryId = async (StoryId) => {
    try {
        const result = await db.select().from(nodesTables).where(nodesTables.storyId.eq(StoryId));
        return result;
    }
    catch (err) {
        console.log("[GET NODES BY STORY ID ERROR]", err);
        throw err;
    }
}

export const AddNodes = async (NewNode) => {
    try {
        return db.insert(nodesTables).values(NewNode);
    }
    catch (err) {
        console.log("[CREATE NODE ERROR]", err);
        throw err;
    }
}

export const RemoveNodes = async (NodeId) => {
    try {
        const result = await db.delete(nodesTables).where(eq(nodesTables.id, NodeId));
        return result;
    } catch (err) {
        console.log("[DELETE NODE ERROR]", err);
        throw err;
    }
}

export const UpdateNodes = async (NodeId, Pos) => {
    try {
        const result = await db.update(nodesTables).set({
            positionX: Pos.x,
            positionY: Pos.y,
        }).where(eq(nodesTables.id, NodeId));
        return result;
    } catch (err) {
        console.log("[UPDATE NODE POSITION ERROR]", err);
        throw err;
    }
}