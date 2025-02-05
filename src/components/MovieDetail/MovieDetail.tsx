// src/components/MovieDetail.tsx

import React from 'react';
import { useGetMovieByIdQuery } from '../../api/kinopoiskApi';
import styles from './styles.module.scss';

interface MovieDetailProps {
  movieId: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId }) => {
  const { data, error, isLoading } = useGetMovieByIdQuery(movieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.data?.message}</div>;

  return (
    <div className={styles.movieDetailContainer}>
      <img
        src={data?.posterUrl}
        alt={data?.nameRu}
        className={styles.moviePoster}
      />
      <h2>{data?.nameRu}</h2>
      <p>{data?.description}</p>
      <p>Year: {data?.year}</p>
      {/* Render additional movie details here */}
    </div>
  );
};

export default MovieDetail;
