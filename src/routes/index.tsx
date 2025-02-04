// src/router.tsx
import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { store } from '../app/store';
import { kinopoiskApi } from '../api/kinopoiskApi';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: () => redirect('/movies'),
  },
  {
    path: 'movies',
    element: <HomePage />,
    loader: () => {
      loadStore().then(() => {
        store.dispatch(kinopoiskApi.util.prefetch('getMovies', 'initial_query', {}));
      });
      return null;
    },
  },
  {
    path: 'movies/:id',
    element: <MoviePage />,
    loader: ({ params }) => {
      loadStore().then(() => {
        store.dispatch(
          kinopoiskApi.util.prefetch('getMovieById', params.id ?? '', {}),
        );
      });
      return null;
    },
  },
]);
