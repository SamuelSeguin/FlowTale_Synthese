"server-only"

import { db } from "@/db";
import { storyTables } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const CreationHistoire = async (histoireData) => {
    try {
        return db.insert(storyTables).values(histoireData);
    } catch (err) {
        console.log("[CREATION HISTOIRE ERROR]", err);
        throw err;
    }
}

export const GetAllStories = async () => {
    try {
        const result = await db.select().from(storyTables);
        return result;
    } catch (err) {
        console.log("[GET ALL STORIES ERROR]", err);
        throw err;
    }
}

export const GetStoryByUserId = async (userId) => {
    try {
        const result = await db.select().from(storyTables).where(eq(storyTables.auteur, userId));
        return result;
    } catch (err) {
        console.log("[GET STORY BY ID ERROR]", err);
        throw err;
    }
}

export const GetStoryById = async (storyId) => {
    try {
        const result = await db.select().from(storyTables).where(eq(storyTables.id, storyId));
        return result;
    } catch (err) {
        console.log("[GET STORY BY ID ERROR]", err);
        throw err;
    }
}