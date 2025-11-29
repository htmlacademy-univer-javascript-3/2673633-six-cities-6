import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '@/store/reducer.ts';

export const store = configureStore({ reducer });
