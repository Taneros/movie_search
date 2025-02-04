import React from 'react';
import MovieList from '../components/MovieList/MovieList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <MovieList />
    </div>
  );
};

export default HomePage;