import { offers } from '@/mocks/offers.ts';
import { city } from '@/mocks/city.ts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers } from '@/store/action.ts';

const initialState = {
  city: city,
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});


