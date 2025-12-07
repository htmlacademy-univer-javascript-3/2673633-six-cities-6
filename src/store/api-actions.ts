import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '@/types/state.ts';
import { Offer } from '@/types/offer.ts';
import { loadCurrentOffer, loadNearOffers, loadOffers, loadReviews } from '@/store/actions.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';
import { Review } from '@/types/review.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(loadOffers(data));
  },
);

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffer',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<ExpandedOffer>(`/offers/${id}`);
    dispatch(loadCurrentOffer(data));
  },
);

export const fetchReviews = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${id}`);
    dispatch(loadReviews(data));
  },
);

export const fetchNearOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearOffers',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
    dispatch(loadNearOffers(data));
  },
);
