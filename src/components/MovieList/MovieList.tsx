import React from 'react';
import { useGetMoviesQuery } from '../../api/kinopoiskApi';

const MovieList: React.FC = () => {
  const { data, error, isLoading } = useGetMoviesQuery('Inception');

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    // Check if the error is a FetchBaseQueryError
    if ('data' in error) {
      // Access the error data
      const errorMessage = error.data;
      return <div>Error: {errorMessage as string}</div>;
    } else {
      // Handle other types of errors
      return <div>An unknown error occurred.</div>;
    }
  }

  return (
    <div>
      {data?.items.map((movie) => (
        <div key={movie.kinopoiskId}>
          <h3>{movie.nameOriginal}</h3>
          {/* Render additional movie details here */}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
