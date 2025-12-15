"server-only"

import { db } from "@/db"
import { commentsTables } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const GetAllCommentsByStoryId = async (storyId) => {
    try {
        const result = await db.select().from(commentsTables).where(eq(commentsTables.storyId, storyId));
        return result;
    } catch (err) {
        console.log("[GET ALL COMMENTS BY STORY ID ERROR]", err);
        throw err;
    }
}

export const AddComment = async (commentData) => {
    try {
        const result = await db.insert(commentsTables).values(commentData);
        return result;
    } catch (err) {
        console.log("[ADD COMMENT ERROR]", err);
        throw err;
    }
}