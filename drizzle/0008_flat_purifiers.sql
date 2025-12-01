PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_story` (
	`id` text PRIMARY KEY NOT NULL,
	`titre` text NOT NULL,
	`auteur` text NOT NULL,
	`auteurName` text NOT NULL,
	`synopsis` text NOT NULL,
	`ambiance` text NOT NULL,
	`musique` text NOT NULL,
	`public` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`auteur`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_story`("id", "titre", "auteur", "auteurName", "synopsis", "ambiance", "musique", "public", "created_at") SELECT "id", "titre", "auteur", "auteurName", "synopsis", "ambiance", "musique", "public", "created_at" FROM `story`;--> statement-breakpoint
DROP TABLE `story`;--> statement-breakpoint
ALTER TABLE `__new_story` RENAME TO `story`;--> statement-breakpoint
PRAGMA foreign_keys=ON;