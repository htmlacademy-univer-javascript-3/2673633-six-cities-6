import { createAction } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer.ts';
import { City } from '@/types/city.ts';
import { SortingOptions } from '@/utils/sorting-variables.ts';
import { ExpandedOffer } from '@/types/expanded-offer.ts';

export const changeCity = createAction<City>('changeCity');
export const loadOffers = createAction<Offer[]>('fillOffers');
export const changeSorting = createAction<SortingOptions>('changeSorting');
export const loadCurrentOffer = createAction<ExpandedOffer | null>('loadCurrentOffer');
