import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './slices/offers/offers.ts';
import currentOfferReducer from './slices/current-offer/current-offer.ts';
import userReducer from './slices/user/user.ts';

export const reducer = combineReducers({
  offers: offersReducer,
  currentOffer: currentOfferReducer,
  user: userReducer,
});
