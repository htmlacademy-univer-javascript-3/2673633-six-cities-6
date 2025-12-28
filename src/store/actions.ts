import { createAction } from '@reduxjs/toolkit';
import { City } from '@/types/city/city';
import { Offer } from '@/types/offer/offer';
import { Review } from '@/types/review/review';
import { ExpandedOffer } from '@/types/expanded-offer/expanded-offer';
import { SORTING_OPTIONS } from '@/constants/forms/forms';
import { ACTION } from '@/constants/actions/actions';
import { AuthStatus } from '@/types/auth-status/auth-status.ts';

export const changeCity = createAction<City>(ACTION.ChangeCity);
export const loadOffers = createAction<Offer[]>(ACTION.LoadOffers);
export const changeOffersLoadingStatus = createAction<boolean>(ACTION.ChangeOffersLoadingStatus);
export const changeSorting = createAction<SORTING_OPTIONS>(ACTION.ChangeSorting);
export const loadCurrentOffer = createAction<ExpandedOffer | null>(ACTION.LoadCurrentOffer);
export const changeCurrentOfferLoadingStatus =
  createAction<boolean>(ACTION.ChangeCurrentOfferLoadingStatus);
export const loadReviews = createAction<Review[]>(ACTION.LoadReviews);
export const changeReviewsLoadingStatus =
  createAction<boolean>(ACTION.ChangeReviewsLoadingStatus);
export const loadNearOffers = createAction<Offer[]>(ACTION.LoadNearOffers);
export const changeNearOfferLoadingStatus =
  createAction<boolean>(ACTION.ChangeNearOfferLoadingStatus);
export const changeAuthorizationStatus =
  createAction<AuthStatus>(ACTION.ChangeAuthorizationStatus);
export const setEmail = createAction<string | null>(ACTION.SetEmail);
export const setAvatarUrl = createAction<string | null>(ACTION.SetAvatarUrl);
export const loadFavoriteOffers = createAction<Offer[]>(ACTION.LoadFavoriteOffers);
