import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSorting,
  loadCurrentOffer,
  loadNearOffers,
  loadOffers,
  loadReviews,
} from '@/store/actions.ts';
import { City } from '@/types/city.ts';
import { Offer } from '@/types/offer.ts';
import { SortingOptions } from '@/utils/sorting-variables.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';
import { Review } from '@/types/review.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  sorting: SortingOptions;
  currentOffer: ExpandedOffer | null;
  reviews: Review[];
  nearOffers: Offer[];
}

const initialState: InitialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  offers: [],
  sorting: SortingOptions.Popular,
  currentOffer: null,
  reviews: [],
  nearOffers: [],
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
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    });
});


