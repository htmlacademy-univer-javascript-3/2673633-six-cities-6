import { offers } from '@/mocks/offers.ts';
import { city } from '@/mocks/city.ts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting, fillOffers } from '@/store/action.ts';
import { City } from '@/types/city.ts';
import { Offer } from '@/types/offer.ts';
import { SortingOptions } from '@/utils/sorting-variables.ts';

type State = {
  city: City;
  offers: Offer[];
  sorting: SortingOptions;
}

const initialState: State = {
  city: city,
  offers: offers,
  sorting: SortingOptions.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    });
});


