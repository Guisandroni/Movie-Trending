import { Movie } from "@/app/types/movieType";


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};



export const getMovies = async (query = '', page = 1): Promise<{ movies: Movie[]; totalPages: number }> => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();

  return {
    movies: data.results || [],
    totalPages: data.total_pages || 1,
  };
};


export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    await fetch('/api/trending', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, movie }),
    });
  } catch (error) {
    console.error('Error in search trending', error)
  }
};


export const getGlobalTrendingMovies = async (): Promise<Movie[]> => {
  const endpoint = `${API_BASE_URL}/trending/movie/day?language=en-US`
  
  const response = await fetch(endpoint, API_OPTIONS);
  
  if(!response.ok){
    throw new Error('failed to loading trending')
  }
  
  
  const data = await response.json();
  
  return data.results || []

}

export const getMovieById = async (id: string): Promise<Movie> => {
  const endpoint = `${API_BASE_URL}/movie/${id}?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return await response.json();
}