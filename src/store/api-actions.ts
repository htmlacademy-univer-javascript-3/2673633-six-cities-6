import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '@/types/state.ts';
import { Offer } from '@/types/offer.ts';
import {
  changeAuthorizationStatus,
  changeCurrentOfferLoadingStatus,
  changeNearOfferLoadingStatus,
  changeOffersLoadingStatus,
  changeReviewsLoadingStatus,
  loadCurrentOffer,
  loadFavoriteOffers,
  loadNearOffers,
  loadOffers,
  loadReviews,
  setAvatarUrl,
  setEmail,
} from '@/store/actions.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';
import { Review } from '@/types/review.ts';
import { User } from '@/types/user.ts';
import { removeToken, setToken } from '@/services/token.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(changeOffersLoadingStatus(true));
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(loadOffers(data));
    } catch (error) { /* empty */
    } finally {
      dispatch(changeOffersLoadingStatus(false));
    }
  },
);

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffer',
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(changeCurrentOfferLoadingStatus(true));
      const { data } = await api.get<ExpandedOffer>(`/offers/${id}`);
      dispatch(loadCurrentOffer(data));
    } catch (error) { /* empty */
    } finally {
      dispatch(changeCurrentOfferLoadingStatus(false));
    }
  },
);

export const fetchReviews = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(changeReviewsLoadingStatus(true));
      const { data } = await api.get<Review[]>(`/comments/${id}`);
      dispatch(loadReviews(data));
    } catch (error) { /* empty */
    } finally {
      dispatch(changeReviewsLoadingStatus(false));
    }
  },
);

export const fetchNearOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearOffers',
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(changeNearOfferLoadingStatus(true));
      const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
      dispatch(loadNearOffers(data));
    } catch (error) { /* empty */
    } finally {
      dispatch(changeNearOfferLoadingStatus(false));
    }
  },
);

export const login = createAsyncThunk<void, {
  email: string;
  password: string;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<User>('/login', { email, password });
      setToken(data.token);
      dispatch(changeAuthorizationStatus('auth'));
      dispatch(setEmail(data.email));
      dispatch(setAvatarUrl(data.avatarUrl));
    } catch (error) {
      removeToken();
      dispatch(changeAuthorizationStatus('no-auth'));
      dispatch(setEmail(null));
      dispatch(setAvatarUrl(null));
    } finally { /* empty */
    }
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>('/login');
      dispatch(changeAuthorizationStatus('auth'));
      dispatch(setEmail(data.email));
      dispatch(setAvatarUrl(data.avatarUrl));
    } catch (error) {
      removeToken();
      dispatch(setEmail(null));
      dispatch(setAvatarUrl(null));
      dispatch(changeAuthorizationStatus('no-auth'));
    } finally { /* empty */
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete('/logout');
      removeToken();
      dispatch(changeAuthorizationStatus('no-auth'));
      dispatch(setEmail(null));
      dispatch(setAvatarUrl(null));
    } catch (error) { /* empty */
    } finally { /* empty */
    }
  },
);

export const sendReview = createAsyncThunk<void, {
  id: string;
  comment: string;
  rating: string;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'sendReview',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<Review>(`/comments/${id}`, { comment, rating: Number(rating) });
    dispatch(fetchReviews(id));
  },
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>('/favorite');
      dispatch(loadFavoriteOffers(data));
    } catch (error) { /* empty */
    } finally { /* empty */
    }
  },
);

export const changeFavoriteStatus = createAsyncThunk<void, {
  id: string;
  status: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changeFavoriteStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    await api.post<Offer[]>(`/favorite/${id}/${status}`);
    dispatch(fetchFavoriteOffers());
  },
);

