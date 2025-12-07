import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '@/types/state.ts';
import { Offer } from '@/types/offer.ts';
import {
  changeCurrentOfferLoadingStatus, changeNearOfferLoadingStatus,
  changeOffersLoadingStatus, changeReviewsLoadingStatus,
  loadCurrentOffer,
  loadNearOffers,
  loadOffers,
  loadReviews,
} from '@/store/actions.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';
import { Review } from '@/types/review.ts';

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
    } catch (error) { /* empty */ } finally {
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
    } catch (error) { /* empty */ } finally {
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
    } catch (error) { /* empty */ } finally {
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
    } catch (error) { /* empty */ } finally {
      dispatch(changeNearOfferLoadingStatus(false));
    }
  },
);
