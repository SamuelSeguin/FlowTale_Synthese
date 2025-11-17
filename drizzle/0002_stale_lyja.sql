PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`auteur` text NOT NULL,
	`storyId` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`auteur`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`storyId`) REFERENCES `story`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "description", "auteur", "storyId", "created_at") SELECT "id", "description", "auteur", "storyId", "created_at" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_edges` (
	`id` text PRIMARY KEY NOT NULL,
	`storyId` text NOT NULL,
	`source` text NOT NULL,
	`target` text NOT NULL,
	`data` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`storyId`) REFERENCES `story`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`source`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`target`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_edges`("id", "storyId", "source", "target", "data", "created_at") SELECT "id", "storyId", "source", "target", "data", "created_at" FROM `edges`;--> statement-breakpoint
DROP TABLE `edges`;--> statement-breakpoint
ALTER TABLE `__new_edges` RENAME TO `edges`;--> statement-breakpoint
CREATE TABLE `__new_image` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text,
	`auteur` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`auteur`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_image`("id", "url", "auteur", "created_at") SELECT "id", "url", "auteur", "created_at" FROM `image`;--> statement-breakpoint
DROP TABLE `image`;--> statement-breakpoint
ALTER TABLE `__new_image` RENAME TO `image`;--> statement-breakpoint
CREATE TABLE `__new_musique` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text,
	`auteur` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`auteur`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_musique`("id", "url", "auteur", "created_at") SELECT "id", "url", "auteur", "created_at" FROM `musique`;--> statement-breakpoint
DROP TABLE `musique`;--> statement-breakpoint
ALTER TABLE `__new_musique` RENAME TO `musique`;--> statement-breakpoint
CREATE TABLE `__new_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	`data` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_nodes`("id", "position_x", "position_y", "data", "created_at") SELECT "id", "position_x", "position_y", "data", "created_at" FROM `nodes`;--> statement-breakpoint
DROP TABLE `nodes`;--> statement-breakpoint
ALTER TABLE `__new_nodes` RENAME TO `nodes`;--> statement-breakpoint
CREATE TABLE `__new_story` (
	`id` text PRIMARY KEY NOT NULL,
	`titre` text NOT NULL,
	`auteur` text NOT NULL,
	`synopsis` text NOT NULL,
	`ambiance` text NOT NULL,
	`animation` text NOT NULL,
	`musique` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`auteur`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_story`("id", "titre", "auteur", "synopsis", "ambiance", "animation", "musique", "created_at") SELECT "id", "titre", "auteur", "synopsis", "ambiance", "animation", "musique", "created_at" FROM `story`;--> statement-breakpoint
DROP TABLE `story`;--> statement-breakpoint
ALTER TABLE `__new_story` RENAME TO `story`;