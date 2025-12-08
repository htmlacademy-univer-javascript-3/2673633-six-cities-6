import { createSlice } from '@reduxjs/toolkit';
import { changeCity, changeOffersLoadingStatus, changeSorting, loadOffers } from '@/store/actions';
import { Offer } from '@/types/offer';
import { SortingOptions } from '@/utils/sorting-variables';
import { City } from '@/types/city.ts';

type OffersState = {
  city: City;
  offers: Offer[];
  isOffersLoading: boolean;
  sorting: SortingOptions;
};

const initialState: OffersState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  offers: [],
  isOffersLoading: false,
  sorting: SortingOptions.Popular,
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
