ALTER TABLE `edges` ADD `storyId` text NOT NULL REFERENCES story(id);--> statement-breakpoint
ALTER TABLE `nodes` ADD `storyId` text NOT NULL REFERENCES story(id);