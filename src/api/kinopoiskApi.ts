// src/api/kinopoiskApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'your_api_key';
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';

export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}

export interface Movie {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: Country[];
  genres: Genre[];
  ratingKinopoisk: number | null;
  ratingImdb: number | null;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string | null;
  logoUrl: string | null;
  description: string;
  ratingAgeLimits: string;
}

interface MovieResponse {
  items: Movie[];
  total: number;
  totalPages: number;
}

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', API_KEY);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieResponse, string>({
      query: (query) => `/v2.1/films/search-by-keyword?keyword=${query}`,
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `/v2.1/films/${id}`,
    }),
  }),
  tagTypes: ['Movies'],
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = kinopoiskApi;
