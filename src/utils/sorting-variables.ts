import { Offer } from '@/types/offer';

export enum SortingOptions {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

const sortingFunctions = {
  [SortingOptions.Popular]: (offers: Offer[]) => offers,
  [SortingOptions.LowToHigh]: (offers: Offer[]) =>
    [...offers].sort((a, b) => a.price - b.price),
  [SortingOptions.HighToLow]: (offers: Offer[]) =>
    [...offers].sort((a, b) => b.price - a.price),
  [SortingOptions.TopRated]: (offers: Offer[]) =>
    [...offers].sort((a, b) => b.rating - a.rating),
} as const;

export const sort = (offers: Offer[]) => ({
  by<K extends SortingOptions>(key: K) {
    return sortingFunctions[key](offers);
  },
});
