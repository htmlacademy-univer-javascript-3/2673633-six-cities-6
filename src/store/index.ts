import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '@/store/reducer.ts';
import { createAPI } from '@/services/api/api.ts';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
  ),
});
