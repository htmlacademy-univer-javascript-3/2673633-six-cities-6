import { createSlice } from '@reduxjs/toolkit';
import { changeAuthorizationStatus, loadFavoriteOffers, setAvatarUrl, setEmail } from '@/store/actions.ts';
import { Offer } from '@/types/offer/offer.ts';
import { AuthStatus } from '@/types/auth-status/auth-status.ts';
import { AUTH_STATUS } from '@/constants/auth-status/auth-status.ts';
import { SLICE } from '@/constants/store/store.ts';

type UserState = {
  authorizationStatus: AuthStatus;
  email: string | null;
  avatarUrl: string | null;
  favoriteOffers: Offer[];
};

const initialState: UserState = {
  authorizationStatus: AUTH_STATUS.Unknown,
  email: null,
  avatarUrl: null,
  favoriteOffers: [],
};

export const user = createSlice({
  name: SLICE.User,
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
