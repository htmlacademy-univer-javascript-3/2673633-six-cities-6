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
import { API_ACTION, TOAST_MESSAGES } from '@/constants/api-actions/api-actions';
import { AUTH_STATUS } from '@/constants/auth-status/auth-status';
import { API_ROUTE } from '@/constants/api/api';
import { toast } from 'react-toastify';


export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  API_ACTION.FetchOffers,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(changeOffersLoadingStatus(true));

    try {
      const { data } = await toast.promise(
        api.get<Offer[]>(API_ROUTE.Offers),
        { error: TOAST_MESSAGES.FetchOffersError },
      );

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
    dispatch(changeCurrentOfferLoadingStatus(true));

    try {
      const { data } = await toast.promise(
        api.get<ExpandedOffer>(`${API_ROUTE.Offers}/${id}`),
        { error: TOAST_MESSAGES.FetchOfferError },
      );

      dispatch(loadCurrentOffer(data));
    } finally {
      dispatch(changeCurrentOfferLoadingStatus(false));
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
    dispatch(changeNearOfferLoadingStatus(true));

    try {
      const { data } = await toast.promise(
        api.get<Offer[]>(`${API_ROUTE.Offers}/${id}/nearby`),
        { error: TOAST_MESSAGES.FetchNearOffersError },
      );

      dispatch(loadNearOffers(data));
    } finally {
      dispatch(changeNearOfferLoadingStatus(false));
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
    dispatch(changeReviewsLoadingStatus(true));

    try {
      const { data } = await toast.promise(
        api.get<Review[]>(`${API_ROUTE.Reviews}/${id}`),
        { error: TOAST_MESSAGES.FetchReviewsError },
      );

      dispatch(loadReviews(data));
    } finally {
      dispatch(changeReviewsLoadingStatus(false));
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
  API_ACTION.SendReview,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await toast.promise(
      api.post<Review>(`${API_ROUTE.Reviews}/${id}`, {
        comment,
        rating: Number(rating),
      }),
      {
        success: TOAST_MESSAGES.SendReviewSuccess,
        error: TOAST_MESSAGES.SendReviewError,
      },
    );

    dispatch(fetchReviews(id));
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
      const { data } = await toast.promise(
        api.post<User>(API_ROUTE.Login, { email, password }),
        {
          success: TOAST_MESSAGES.LoginSuccess,
          error: TOAST_MESSAGES.LoginError,
        },
      );

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
    await toast.promise(
      api.delete(API_ROUTE.Login),
      {
        success: TOAST_MESSAGES.LogoutSuccess,
        error: TOAST_MESSAGES.LogoutError,
      },
    );

    removeToken();
    dispatch(changeAuthorizationStatus(AUTH_STATUS.NoAuth));
    dispatch(setEmail(null));
    dispatch(setAvatarUrl(null));
  },
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  API_ACTION.FetchFavoriteOffers,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await toast.promise(
      api.get<Offer[]>(API_ROUTE.Favorite),
      { error: TOAST_MESSAGES.FetchFavoriteOffersError },
    );

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
    await toast.promise(
      api.post(`${API_ROUTE.Favorite}/${id}/${status}`),
      { error: TOAST_MESSAGES.ChangeFavoriteStatusError },
    );

    dispatch(fetchFavoriteOffers());
  },
);
