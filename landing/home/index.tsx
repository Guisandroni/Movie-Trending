'use client';
import { Movie, TrendingItem } from '@/app/types/movieType';
import Header from '@/components/header';
import MovieCard from '@/components/movieCard';
import Search from '@/components/search';
import Spinner from '@/components/spinner';
import { getMovies, updateSearchCount } from '@/lib/api';
import { useEffect, useState } from 'react';

export function IndexHome() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState<TrendingItem[]>([]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);

    return () => clearTimeout(handle);
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const movies = await getMovies(query);

      setMovieList(movies);

      if (query && movies.length > 0) {
        await updateSearchCount(query, movies[0]);
      }

      if (query && movies.length === 0) {
        setErrorMessage('No movie found');
      }
    } catch (error) {
      console.error(`Error conecting, ${error}`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const res = await fetch('/api/trending');
        // if (!res.ok) return;
        const data = await res.json();

        console.log('teste front api', data);
        setTrendingMovies(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTrending();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header />

        <section className="all-movies">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.id}>
                    <p>{index + 1}</p>
                    <img src={movie.posterPath} alt={movie.searchTerm} />
                    <p className="text-center text-xs mt-1 capitalize text-gray-200">
                      {movie.searchTerm}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <h2 className="mt-[4px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
