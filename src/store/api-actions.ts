import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '@/types/state/state';
import { Offer } from '@/types/offer/offer';
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
} from '@/store/actions';
import { ExpandedOffer } from '@/types/expanded-offer/expanded-offer';
import { Review } from '@/types/review/review';
import { User } from '@/types/user/user';
import { removeToken, setToken } from '@/services/token/token';
import { API_ACTION } from '@/constants/api-actions/api-actions';
import { AUTH_STATUS } from '@/constants/auth-status/auth-status.ts';
import { API_ROUTE } from '@/constants/api/api.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  API_ACTION.FetchOffers,
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(changeOffersLoadingStatus(true));
      const { data } = await api.get<Offer[]>(API_ROUTE.Offers);
      dispatch(loadOffers(data));
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
  API_ACTION.FetchOffer,
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(changeCurrentOfferLoadingStatus(true));
      const { data } = await api.get<ExpandedOffer>(`${API_ROUTE.Offers}/${id}`);
      dispatch(loadCurrentOffer(data));
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
  API_ACTION.FetchReviews,
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(changeReviewsLoadingStatus(true));
      const { data } = await api.get<Review[]>(`${API_ROUTE.Reviews}/${id}`);
      dispatch(loadReviews(data));
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
  API_ACTION.FetchNearOffers,
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(changeNearOfferLoadingStatus(true));
      const { data } = await api.get<Offer[]>(`${API_ROUTE.Offers}/${id}/nearby`);
      dispatch(loadNearOffers(data));
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
  API_ACTION.Login,
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<User>(API_ROUTE.Login, { email, password });
      setToken(data.token);
      dispatch(changeAuthorizationStatus(AUTH_STATUS.Auth));
      dispatch(setEmail(data.email));
      dispatch(setAvatarUrl(data.avatarUrl));
    } catch {
      removeToken();
      dispatch(changeAuthorizationStatus(AUTH_STATUS.NoAuth));
      dispatch(setEmail(null));
      dispatch(setAvatarUrl(null));
    }
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  API_ACTION.CheckAuth,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(API_ROUTE.Login);
      dispatch(changeAuthorizationStatus(AUTH_STATUS.Auth));
      dispatch(setEmail(data.email));
      dispatch(setAvatarUrl(data.avatarUrl));
    } catch {
      removeToken();
      dispatch(changeAuthorizationStatus(AUTH_STATUS.NoAuth));
      dispatch(setEmail(null));
      dispatch(setAvatarUrl(null));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  API_ACTION.Logout,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(API_ROUTE.Login);
    removeToken();
    dispatch(changeAuthorizationStatus(AUTH_STATUS.NoAuth));
    dispatch(setEmail(null));
    dispatch(setAvatarUrl(null));
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
  API_ACTION.SendReview,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<Review>(`${API_ROUTE.Reviews}/${id}`, {
      comment,
      rating: Number(rating),
    });
    dispatch(fetchReviews(id));
  },
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  API_ACTION.FetchFavoriteOffers,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(API_ROUTE.Favorite);
    dispatch(loadFavoriteOffers(data));
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
  API_ACTION.ChangeFavoriteStatus,
  async ({ id, status }, { dispatch, extra: api }) => {
    await api.post(`${API_ROUTE.Favorite}/${id}/${status}`);
    dispatch(fetchFavoriteOffers());
  },
);
