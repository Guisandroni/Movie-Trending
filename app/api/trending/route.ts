import { Movie, TrendingItem } from '@/app/types/movieType';
import { db } from '@/database';
import { trendingMovies } from '@/database/schema';
import { NextResponse } from 'next/server';
import { desc, sql } from 'drizzle-orm'


// const globalForTrending = global as unknown as {
//   trendingDataset: Record<string, TrendingItem>;
// };

// const dataset: Record<string, TrendingItem> = {};

// const dataset = globalForTrending.trendingDataset || {};
// if (process.env.NODE_ENV !== 'production')
//   globalForTrending.trendingDataset = dataset;

export async function GET() {
  try {
    const data = await db
      .select()
      .from(trendingMovies)
      .orderBy(desc(trendingMovies.count))
      .limit(5)

    return NextResponse.json(data);
    
  } catch (error) {
    
    return NextResponse.json(
      {
        error: 'Error search treading'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {

  try {
    
    const body = await request.json();
    const { query, movie } = body;

    if (!query || !movie) {
      return NextResponse.json({ error: 'Data incomplete' }, { status: 400 });
    }

    const termo = query.toLowerCase().trim();

    await db
      .insert(trendingMovies)
      .values({
        searchterm: termo,
        count: 1,
        movieId: movie.id,
        posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
      .onConflictDoUpdate({
        target: trendingMovies.searchterm,
        set: {
          count: sql`${trendingMovies.count}+1`,
          posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      })
 
    return NextResponse.json({ sucess: true });
  } catch (error) {
    console.error(error); return NextResponse.json({ error: ' Erro databse' }, { status: 500 })
  }
}