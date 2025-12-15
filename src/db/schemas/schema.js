import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";
import { relations, sql } from "drizzle-orm";

export const storyTables = sqliteTable("story", {
    id: text("id").primaryKey(),
    titre: text("titre").notNull(),
    auteur: text("auteur")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
    auteurName: text("auteurName").notNull(),
    synopsis: text("synopsis").notNull(),
    ambiance: text("ambiance").notNull(),
    animation: text("animation").notNull(),
    public: integer("public").notNull().default(0), // 0 = privé, 1 = public
    image: text("image").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const commentsTables = sqliteTable("comments", {
    id: text("id").primaryKey(),
    text: text("description").notNull(),
    auteur: text("auteur")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
    auteurName: text("auteurName").notNull(),
    storyId: text("storyId")
    .references(() => storyTables.id, {onDelete: "cascade"})
    .notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const nodesTables = sqliteTable("nodes", {
  id: text("id").primaryKey(),
  positionX: integer('position_x').notNull(),
  positionY: integer('position_y').notNull(),
  data: text({mode: 'json'}), // Titre, Text, Image, Musique, Ambiance, Animation, Type (Start, Story, End, Conditionnel)
  storyId: text("storyId")
   .references(() => storyTables.id, { onDelete: "cascade" })
   .notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const edgesTables = sqliteTable("edges", {
    id: text("id").primaryKey(),
    source: text("source")
    .references(() => nodesTables.id, { onDelete: "cascade" })
    .notNull(),
    target: text("target")
    .references(() => nodesTables.id, { onDelete: "cascade" })
    .notNull(),
    data: text({mode: 'json'}), // Choix Texte, Conditionnel ou Non,
    storyId: text("storyId")
    .references(() => storyTables.id, {onDelete: "cascade"})
    .notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const imageTables = sqliteTable("image", {
    id: text("id").primaryKey(), 
    url: text("url"),
    auteur: text("auteur")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export const musiqueTables = sqliteTable("musique", {
    id: text("id").primaryKey(),
    url: text("url"),
    auteur: text("auteur")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export const storyRelations = relations(storyTables, ({ many }) => ({
  nodes: many(nodesTables),
  edges: many(edgesTables),
  comments: many(commentsTables),
}));

export const nodesRelations = relations(nodesTables, ({ one, many }) => ({
  story: one(storyTables, {
    fields: [nodesTables.storyId],
    references: [storyTables.id],
  }),

  // Toutes les branches qui partent de ce node
  outgoingEdges: many(edgesTables, {
    relationName: "sourceNode",
  }),

  // Toutes les branches qui arrivent vers ce node
  incomingEdges: many(edgesTables, {
    relationName: "targetNode",
  }),
}));

export const edgesRelations = relations(edgesTables, ({ one }) => ({
  story: one(storyTables, {
    fields: [edgesTables.storyId],
    references: [storyTables.id],
  }),

  // Node source
  sourceNode: one(nodesTables, {
    fields: [edgesTables.source],
    references: [nodesTables.id],
    relationName: "sourceNode",
  }),

  // Node cible
  targetNode: one(nodesTables, {
    fields: [edgesTables.target],
    references: [nodesTables.id],
    relationName: "targetNode",
  }),
}));
