import { Offer } from '@/types/offer';
import { SORTING_OPTIONS } from '@/constants/constants.ts';

const sortingFunctions = {
  [SORTING_OPTIONS.Popular]: (offers: Offer[]) => offers,
  [SORTING_OPTIONS.LowToHigh]: (offers: Offer[]) =>
    [...offers].sort((a, b) => a.price - b.price),
  [SORTING_OPTIONS.HighToLow]: (offers: Offer[]) =>
    [...offers].sort((a, b) => b.price - a.price),
  [SORTING_OPTIONS.TopRated]: (offers: Offer[]) =>
    [...offers].sort((a, b) => b.rating - a.rating),
} as const;

export const sort = (offers: Offer[]) => ({
  by<K extends SORTING_OPTIONS>(key: K) {
    return sortingFunctions[key](offers);
  },
});
