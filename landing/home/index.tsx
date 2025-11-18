'use client'
import Header from '@/components/header';
import MovieCard, { Movie } from '@/components/movieCard';
import Search from '@/components/search';
import Spinner from '@/components/spinner';
import { getMovies } from '@/lib/api';
import { useEffect, useState } from 'react';


export function IndexHome () {
  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

      if (query && movies.length === 0) {
        setErrorMessage('Failed to fetch movies');
        setMovieList([]);
        return;
      }
    } catch (error) {
      console.error(`Error conecting, ${error}`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header />

        <section className="all-movies">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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