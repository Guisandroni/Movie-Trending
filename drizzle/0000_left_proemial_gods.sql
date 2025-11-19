CREATE TABLE `trending_movies` (
	`id` integer PRIMARY KEY NOT NULL,
	`search_term` text NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`movie_id` integer NOT NULL,
	`poster_path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `trending_movies_search_term_unique` ON `trending_movies` (`search_term`);