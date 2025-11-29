import { createAction } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer.ts';
import { City } from '@/types/city.ts';

export const changeCity = createAction<City>('changeCity');
export const fillOffers = createAction<Offer[]>('fillOffers');
