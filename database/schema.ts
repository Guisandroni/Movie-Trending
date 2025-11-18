import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const trendingMovies = sqliteTable('trending_movies', {
  id: integer('id').primaryKey(),
  searchterm: text('search_term').notNull().unique(),
  count: integer('count').default(1).notNull(),
  movieId: integer('movie_id').notNull(),
  posterPath: text('poster_path').notNull(),
})


