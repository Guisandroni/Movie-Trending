'use client';
import { Movie, TrendingItem } from '@/app/types/movieType';
import Header from '@/components/header';
import MovieCard from '@/components/movieCard';
import Search from '@/components/search';
import Spinner from '@/components/spinner';
import {
  getGlobalTrendingMovies,
  getMovies,
  updateSearchCount
} from '@/lib/api';
import { useEffect, useState } from 'react';

export function IndexHome() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTrendingMovies, setSearchTrendingMovies] = useState<
    TrendingItem[]
  >([]);
  const [globalTrendingMovies, setGlobalTrendingMovies] = useState<Movie[]>([]);

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
        const resLocal = await fetch('/api/trending');
        if (resLocal.ok) {
          const dataLocal = await resLocal.json();
          setSearchTrendingMovies(dataLocal);
        }

        const globalMovies = await getGlobalTrendingMovies();
        setGlobalTrendingMovies(globalMovies.slice(0, 10));
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
          {globalTrendingMovies.length > 0 && !searchTerm && (
            <section className="  mb-10">
              <h2 className="text-xl font-bold mb-4">
                {' '}
                On the rise in the world
              </h2>
              <ul className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar overflow-y-auto ">
                {globalTrendingMovies.map((movie) => (
                  <li key={movie.id} className="min-w-[150px]">
                    <div className="movie-card bg-dark-100 p-2 rounded-xl">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-lg"
                      />
                      <h3 className="text-sm font-bold mt-2 line-clamp-1 text-white">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <img src="/star.svg" className="size-3" alt="star" />
                        <p className="text-xs text-white font-bold">
                          {movie.vote_average?.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!searchTerm && (
            <>
              {searchTrendingMovies.length > 0 && (
                <section className=" trending mb-10">
                  <h2 className="text-xl font-bold mb-4">
                    Most Searched Movies{' '}
                  </h2>

                  <ul className="flex">
                    {searchTrendingMovies.map((movie, index) => (
                      <li key={movie.id} className="gap-6">
                        <p>{index + 1}</p>
                        <div className=" relative z-10">
                          <img src={movie.posterPath} alt={movie.searchTerm} />
                          <p>{movie.searchTerm}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
          <h2 className="mt-[4px]">
            {searchTerm ? `Search Filter:  ${searchTerm}` : 'All Movies'}
          </h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="all-movies">
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
