import { getMovieById } from '@/lib/api';
import Link from 'next/link';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovieById(id);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-movie.png';

  const releaseYear = movie.release_date?.split('-')[0] ?? 'N/A';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';
  const rating = movie.vote_average?.toFixed(1) ?? 'N/A';

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <main className="min-h-screen bg-[#030014] relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014]" />

      <div className="relative z-10">
        <nav className="px-6 py-6 max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#A8B5DB] hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </nav>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D6C7FF]/20 to-[#AB8BFF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="relative w-full rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/5"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-4 text-xl italic text-[#A8B5DB]/80">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-[#0F0D23] px-4 py-2 rounded-full border border-white/5">
                  <img src="/star.svg" alt="Star" className="w-5 h-5" />
                  <span className="text-white font-bold text-lg">{rating}</span>
                  {movie.vote_count && (
                    <span className="text-[#A8B5DB] text-sm">
                      ({movie.vote_count.toLocaleString()})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-[#0F0D23] px-4 py-2 rounded-full border border-white/5">
                  <svg
                    className="w-4 h-4 text-[#A8B5DB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-white font-medium">{releaseYear}</span>
                </div>

                <div className="flex items-center gap-2 bg-[#0F0D23] px-4 py-2 rounded-full border border-white/5">
                  <svg
                    className="w-4 h-4 text-[#A8B5DB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-white font-medium">{runtime}</span>
                </div>

                {movie.original_language && (
                  <span className="bg-[#0F0D23] px-4 py-2 rounded-full border border-white/5 text-white font-medium uppercase">
                    {movie.original_language}
                  </span>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#AB8BFF]/10 text-[#D6C7FF] border border-[#AB8BFF]/20"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {movie.overview && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Synopsis
                  </h2>
                  <p className="text-[#A8B5DB] text-lg leading-relaxed max-w-2xl">
                    {movie.overview}
                  </p>
                </div>
              )}

              {(movie.budget || movie.revenue) && (
                <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                  {movie.budget && movie.budget > 0 && (
                    <div>
                      <p className="text-sm text-[#A8B5DB] mb-1">Budget</p>
                      <p className="text-xl font-bold text-white">
                        {formatter.format(movie.budget)}
                      </p>
                    </div>
                  )}
                  {movie.revenue && movie.revenue > 0 && (
                    <div>
                      <p className="text-sm text-[#A8B5DB] mb-1">Revenue</p>
                      <p className="text-xl font-bold text-white">
                        {formatter.format(movie.revenue)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {movie.status && (
                <div className="mt-8 flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      movie.status === 'Released'
                        ? 'bg-emerald-400'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-[#A8B5DB] text-sm font-medium">
                    {movie.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
