CREATE TABLE `email_delivery_events` (
	`id` text PRIMARY KEY NOT NULL,
	`email_id` text NOT NULL,
	`event_type` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `delivery_email` ON `email_delivery_events` (`email_id`);--> statement-breakpoint
CREATE TABLE `inquiry_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`user_hash` text NOT NULL,
	`payload_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`last_attempt` integer NOT NULL,
	`attempts` integer DEFAULT 1 NOT NULL,
	`status` text NOT NULL,
	`email_id` text
);
--> statement-breakpoint
CREATE INDEX `inquiry_user_time` ON `inquiry_requests` (`user_hash`,`created_at`);