import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";
import { sql } from "drizzle-orm";

// export const user = sqliteTable("post", {
//   id: text("id").primaryKey(),
//   title: text("title").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp_ms" })
//     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
//     .notNull(),
//   updatedAt: integer("updated_at", { mode: "timestamp_ms" })
//     .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
//     .$onUpdate(() => /* @__PURE__ */ new Date())
//     .notNull(),
// });

export const commentsTables = sqliteTable("comments", {
    id: text("id").primaryKey(),
    text: text("description").notNull(),
    auteur: text("auteur")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
    storyId: text("storyId")
    .references(() => storyTables.id, {onDelete: "cascade"})
    .notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const storyTables = sqliteTable("story", {
    id: text("id").primaryKey(),
    titre: text("titre").notNull(),
    auteur: text("auteur")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
    synopsis: text("synopsis").notNull(),
    ambiance: text("ambiance").notNull(),
    animation: text("animation").notNull(),
    musique: text("musique").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const nodesTables = sqliteTable("nodes", {
  id: text("id").primaryKey(),
  positionX: integer('position_x').notNull(),
  positionY: integer('position_y').notNull(),
  //type: text("type").notNull(), // Start, Story, End, Conditionnel
  data: text({mode: 'json'}), // Titre, Text, Image, Musique, Ambiance, Animation
  //storyId: text("storyId")
  //  .references(() => storyTables.id, { onDelete: "cascade" })
  //  .notNull(),
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
    // storyId: text("storyId")
    // .references(() => storyTables.id, {onDelete: "cascade"})
    // .notNull(),
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