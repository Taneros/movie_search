// src/components/MovieDetail.tsx

import React from 'react';
import { useGetMovieByIdQuery } from '../../api/kinopoiskApi';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface MovieDetailProps {
  movieId: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId }) => {
  const { data, error, isLoading } = useGetMovieByIdQuery(movieId);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.data?.message}</div>;

  const handleBackClick = () => {
    navigate('/movies'); 
  };

  return (
    <div className={styles.movieDetailContainer}>
      <button onClick={handleBackClick} className={styles.backButton}>
        Back to Movies List
      </button>

      <img
        src={data?.posterUrl}
        alt={data?.nameRu}
        className={styles.moviePoster}
      />

      <h2 className={styles.movieName}>{data?.nameRu}</h2>

      <div className={styles.movieDescription}>{data?.description}</div>

      <div className={styles.movieDetails}>
        <p>Year: {data?.year}</p>
        <p>Genres: {data?.genres.map((genre) => genre.genre).join(', ')}</p>
        <p>Countries: {data?.countries.map((country) => country.country).join(', ')}</p>
        <p>Age Limit: {data?.ratingAgeLimits}</p>
        <p>Kinopoisk Rating: {data?.ratingKinopoisk || 'N/A'}</p>
        <p>IMDb Rating: {data?.ratingImdb || 'N/A'}</p>
        {data?.imdbId && (
          <a
            href={`https://www.imdb.com/title/${data.imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imdbLink}
          >
            View on IMDb
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;


