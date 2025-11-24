PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_edges` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`target` text NOT NULL,
	`data` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`source`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`target`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_edges`("id", "source", "target", "data", "created_at") SELECT "id", "source", "target", "data", "created_at" FROM `edges`;--> statement-breakpoint
DROP TABLE `edges`;--> statement-breakpoint
ALTER TABLE `__new_edges` RENAME TO `edges`;--> statement-breakpoint
PRAGMA foreign_keys=ON;