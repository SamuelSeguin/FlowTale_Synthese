"server-only";

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
};

export const GetAllStories = async () => {
  try {
    const result = await db.select().from(storyTables);
    return result;
  } catch (err) {
    console.log("[GET ALL STORIES ERROR]", err);
    throw err;
  }
};

export const GetStoryByUserId = async (userId) => {
  try {
    const result = await db
      .select()
      .from(storyTables)
      .where(eq(storyTables.auteur, userId));

    // const result2 = await db.query.storyTables.findFirst({
    //     where: eq(storyTables.auteur, userId),
    //     with: {
    //         comments: {
    //             with: {
    //                 node: true
    //             }
    //         }
    //     }
    // });

    return result;
  } catch (err) {
    console.log("[GET STORY BY ID ERROR]", err);
    throw err;
  }
};

export const GetStoryById = async (storyId) => {
  try {
    const result = await db
      .select()
      .from(storyTables)
      .where(eq(storyTables.id, storyId));
    return result;
  } catch (err) {
    console.log("[GET STORY BY ID ERROR]", err);
    throw err;
  }
};

export const GetFullStoryById = async (storyId) => {
  try {
    const result = await db.query.storyTables.findFirst({
      where: eq(storyTables.id, storyId),
      with: {
        nodes: {
          with: {
            outgoingEdges: true,
            incomingEdges: true,
          },
        },
        edges: true,
      },
    });

    return result;
  } catch (err) {
    console.log("[GET FULL STORY ERROR]", err);
    throw err;
  }
};

export const UpdatePublicStoryById = async (storyId, publicValue) => {
  try {
    const result = await db.update(storyTables).set({
        public: publicValue,
    }).where(eq(storyTables.id, storyId));
    return result;
  } catch (err) {
    console.log("[UPDATE NODE POSITION ERROR]", err);
    throw err;
  }
}
