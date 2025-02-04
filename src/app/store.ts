import { configureStore } from '@reduxjs/toolkit';
import { kinopoiskApi } from '../api/kinopoiskApi';
import { router } from '../routes';

export const extraArgument = {
  router,
};

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat(kinopoiskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
