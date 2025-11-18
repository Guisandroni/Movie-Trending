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



export const getMovies = async (query = ''): Promise<Movie[]> => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();

  if (data.results && data.results.length === 0) {
    return [];
  }

  return data.results || [];
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


