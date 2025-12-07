import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeCurrentOfferLoadingStatus,
  changeNearOfferLoadingStatus,
  changeOffersLoadingStatus,
  changeReviewsLoadingStatus,
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
  isOffersLoading: boolean;
  sorting: SortingOptions;
  currentOffer: ExpandedOffer | null;
  isCurrentOffersLoading: boolean;
  reviews: Review[];
  isReviewsLoading: boolean;
  nearOffers: Offer[];
  isNearOffersLoading: boolean;
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
  isOffersLoading: false,
  sorting: SortingOptions.Popular,
  currentOffer: null,
  isCurrentOffersLoading: false,
  reviews: [],
  isReviewsLoading: false,
  nearOffers: [],
  isNearOffersLoading: false,
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
    })
    .addCase(changeOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(changeCurrentOfferLoadingStatus, (state, action) => {
      state.isCurrentOffersLoading = action.payload;
    })
    .addCase(changeReviewsLoadingStatus, (state, action) => {
      state.isReviewsLoading = action.payload;
    })
    .addCase(changeNearOfferLoadingStatus, (state, action) => {
      state.isNearOffersLoading = action.payload;
    });
});


