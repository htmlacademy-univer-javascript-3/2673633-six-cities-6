import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '@/types/state.ts';
import { Offer } from '@/types/offer.ts';
import { loadCurrentOffer, loadOffers } from '@/store/actions.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';

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
