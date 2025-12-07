import { city } from '@/mocks/city.ts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting, loadCurrentOffer, loadOffers } from '@/store/actions.ts';
import { City } from '@/types/city.ts';
import { Offer } from '@/types/offer.ts';
import { SortingOptions } from '@/utils/sorting-variables.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  sorting: SortingOptions;
  currentOffer: ExpandedOffer | null;
}

const initialState: InitialState = {
  city: city,
  offers: [],
  sorting: SortingOptions.Popular,
  currentOffer: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    });
});


