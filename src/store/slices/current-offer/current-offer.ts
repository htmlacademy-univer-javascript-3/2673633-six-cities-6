import { createSlice } from '@reduxjs/toolkit';
import {
  changeCurrentOfferLoadingStatus, changeNearOfferLoadingStatus,
  changeReviewsLoadingStatus,
  loadCurrentOffer, loadNearOffers,
  loadReviews,
} from '@/store/actions.ts';
import { ExpandedOffer } from '@/types/expanded-offer/expanded-offer.ts';
import { Review } from '@/types/review/review.ts';
import { Offer } from '@/types/offer/offer.ts';

type CurrentOfferState = {
  currentOffer: ExpandedOffer | null;
  isCurrentOffersLoading: boolean;
  reviews: Review[];
  isReviewsLoading: boolean;
  nearOffers: Offer[];
  isNearOffersLoading: boolean;
};

const initialState: CurrentOfferState = {
  currentOffer: null,
  isCurrentOffersLoading: false,
  reviews: [],
  isReviewsLoading: false,
  nearOffers: [],
  isNearOffersLoading: false,
};

export const currentOffer = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadCurrentOffer, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(changeCurrentOfferLoadingStatus, (state, action) => {
        state.isCurrentOffersLoading = action.payload;
      })
      .addCase(loadReviews, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(changeReviewsLoadingStatus, (state, action) => {
        state.isReviewsLoading = action.payload;
      })
      .addCase(loadNearOffers, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(changeNearOfferLoadingStatus, (state, action) => {
        state.isNearOffersLoading = action.payload;
      }),
});

export default currentOffer.reducer;
