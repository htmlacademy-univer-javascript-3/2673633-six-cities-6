import { createSlice } from '@reduxjs/toolkit';
import { changeCity, changeOffersLoadingStatus, changeSorting, loadOffers } from '@/store/actions.ts';
import { Offer } from '@/types/offer/offer.ts';
import { City } from '@/types/city/city.ts';
import { DEFAULT_CITY, SORTING_OPTIONS } from '@/constants/constants.ts';

type OffersState = {
  city: City;
  offers: Offer[];
  isOffersLoading: boolean;
  sorting: SORTING_OPTIONS;
};

const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  sorting: SORTING_OPTIONS.Popular,
};

export const offers = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadOffers, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(changeOffersLoadingStatus, (state, action) => {
        state.isOffersLoading = action.payload;
      })
      .addCase(changeSorting, (state, action) => {
        state.sorting = action.payload;
      })
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      }),
});

export default offers.reducer;
