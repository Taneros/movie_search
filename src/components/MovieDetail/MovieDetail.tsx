// src/components/MovieDetail.tsx
import React from 'react';
import { useGetMovieByIdQuery } from '../../api/kinopoiskApi';

interface MovieDetailProps {
  movieId: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId }) => {
  const { data, error, isLoading } = useGetMovieByIdQuery(movieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{data?.nameRu}</h2>
      <p>{data?.description}</p>
      {/* Render additional movie details here */}
    </div>
  );
};

export default MovieDetail;
