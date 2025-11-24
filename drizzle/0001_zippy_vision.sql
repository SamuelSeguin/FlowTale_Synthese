PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_nodes` (
	`id` text,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	`data` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_nodes`("id", "position_x", "position_y", "data", "created_at") SELECT "id", "position_x", "position_y", "data", "created_at" FROM `nodes`;--> statement-breakpoint
DROP TABLE `nodes`;--> statement-breakpoint
ALTER TABLE `__new_nodes` RENAME TO `nodes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;