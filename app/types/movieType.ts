export interface Movie {
  id?: number;
  title: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  original_language?: string;
}


export type TrendingItem = {
  id: number,
  searchTerm: string
  count: number;
  movieId: number ;
  posterPath: string
  
}