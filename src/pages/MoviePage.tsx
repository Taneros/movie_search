// src/pages/MoviePage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail/MovieDetail';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Movie Details</h1>
      {id && <MovieDetail movieId={id} />}
    </div>
  );
};

export default MoviePage;