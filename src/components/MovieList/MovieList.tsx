import React, { useState } from 'react';
import { useGetMoviesQuery } from '../../api/kinopoiskApi';
import styles from './styles.module.scss';

import { useNavigate } from 'react-router-dom';

const MovieList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMoviesQuery(page);

  const navigate = useNavigate();



  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if ('data' in error) {
      const message = error.data?.message;
      return <div>Error: {message}</div>;
    } else {
      return <div>An unknown error occurred.</div>;
    }
  }

  if(!data) {
    return <>No data</>
  }

  return (
    <div>
      <div className={styles.movieGrid}>
        {data?.items.map((movie) => (
          <div key={movie.kinopoiskId} className={styles.movieItem}>
            <img
              src={movie.posterUrlPreview}
              alt={movie.nameRu}
              className={styles.moviePoster}
            />
            <div className={styles.movieTitle}>{movie.nameRu}</div>
            <div className={styles.movieDescription}>{movie.description}</div>
            <div>{movie.year}</div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>
          Page {page} of {data?.totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === data?.totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
