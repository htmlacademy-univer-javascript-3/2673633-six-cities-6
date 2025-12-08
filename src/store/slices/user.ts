import { createSlice } from '@reduxjs/toolkit';
import { changeAuthorizationStatus, loadFavoriteOffers, setAvatarUrl, setEmail } from '@/store/actions';
import { Offer } from '@/types/offer.ts';

type UserState = {
  authorizationStatus: 'auth' | 'no-auth' | 'unknown';
  email: string | null;
  avatarUrl: string | null;
  favoriteOffers: Offer[];
};

const initialState: UserState = {
  authorizationStatus: 'unknown',
  email: null,
  avatarUrl: null,
  favoriteOffers: [],
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(changeAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setEmail, (state, action) => {
        state.email = action.payload;
      })
      .addCase(setAvatarUrl, (state, action) => {
        state.avatarUrl = action.payload;
      })
      .addCase(loadFavoriteOffers, (state, action) => {
        state.favoriteOffers = action.payload;
      }),
});

export default user.reducer;
