"server-only";

import { db } from "@/db";
import { storyTables, nodesTables, edgesTables } from "@/db/schemas";
import { eq, desc } from "drizzle-orm";

export const CreationHistoire = async (histoireData) => {
  try {
    return db.insert(storyTables).values(histoireData);
  } catch (err) {
    console.log("[CREATION HISTOIRE ERROR]", err);
    throw err;
  }
};

// export const GetAllStories = async () => {
//   try {
//     const result = await db.select().from(storyTables);
//     return result;
//   } catch (err) {
//     console.log("[GET ALL STORIES ERROR]", err);
//     throw err;
//   }
// };

// -- NEW --
export const getPublishedStories = async () => {
  try {
    const result = await db
      .select()
      .from(storyTables)
      // .where(eq(storyTables.public, 1))
      .orderBy(desc(storyTables.createdAt));
    return result;
  } catch (err) {
    console.log("[GET PUBLISHED STORIES ERROR]", err);
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
    const result = await db
      .update(storyTables)
      .set({
        public: publicValue,
      })
      .where(eq(storyTables.id, storyId));
    return result;
  } catch (err) {
    console.log("[UPDATE NODE POSITION ERROR]", err);
    throw err;
  }
};

export const getStoryInfoById = async (storyId) => {
  const [story] = await db
    .select()
    .from(storyTables)
    .where(eq(storyTables.id, storyId));
  if (!story /* || !story.public */) return null;
  // récupère le node de départ
  const [startNode] = await db
    .select({ id: nodesTables.id })
    .from(nodesTables)
    .where(eq(nodesTables.storyId, storyId))
    .limit(1);
  const startNodeId = startNode?.id ?? null;
  return {
    id: story.id,
    title: story.titre,
    synopsis: story.synopsis,
    ambiance: story.ambiance,
    musique: story.musique,
    authorId: story.auteur,
    authorName: story.auteurName,
    startNodeId,
  };
};
export const getNodeInfoById = async (nodeId) => {
  // 1) Node courant
  const [nodeRow] = await db
    .select()
    .from(nodesTables)
    .where(eq(nodesTables.id, nodeId));
  if (!nodeRow) return null;
  let data = nodeRow.data;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      data = { description: data };
    }
  } else if (!data || typeof data !== "object") {
    data = {};
  }
  const node = { ...nodeRow, data };
  // 2) Branches sortantes
  const branches = await db
    .select({
      id: edgesTables.id,
      data: edgesTables.data,
      targetNodeId: edgesTables.target,
    })
    .from(edgesTables)
    .where(eq(edgesTables.source, nodeId));
  const branchesMapped = branches.map((b) => {
    let texte = "";
    if (typeof b.data === "string") {
      try {
        const parsed = JSON.parse(b.data);
        texte = parsed.texte ?? "";
      } catch {
        texte = b.data;
      }
    } else if (typeof b.data === "object" && b.data !== null) {
      texte = b.data.texte ?? "";
    }
    return {
      id: b.id,
      texte,
      targetNodeId: b.targetNodeId,
    };
  });
  // 3) Retourner node + branches
  return { node, branches: branchesMapped };
};

export const deleteStory = async (storyId) => {
  try {
    await db.delete(storyTables).where(eq(storyTables.id, storyId));
  } catch (err) {
    console.log("[DELETE STORY ERROR]", err);
    throw err;
  }
}
