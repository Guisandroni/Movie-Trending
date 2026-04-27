export interface Movie {
  id?: number;
  title: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  original_language?: string;
  overview?: string;
  backdrop_path?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  vote_count?: number;
}


export type TrendingItem = {
  id: number,
  searchTerm: string
  count: number;
  movieId: number ;
  posterPath: string
  
}