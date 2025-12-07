import { createAction } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer.ts';
import { City } from '@/types/city.ts';
import { SortingOptions } from '@/utils/sorting-variables.ts';

export const changeCity = createAction<City>('changeCity');
export const fillOffers = createAction<Offer[]>('fillOffers');
export const changeSorting = createAction<SortingOptions>('changeSorting');
