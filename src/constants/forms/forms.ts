export const PASSWORD_REGEX = /(?=.*\p{L})(?=.*\d)/u;

export const REVIEW_MIN_LENGTH = 50;

export const RATINGS = [
  { value: '5', id: '5-stars', title: 'perfect' },
  { value: '4', id: '4-stars', title: 'good' },
  { value: '3', id: '3-stars', title: 'not bad' },
  { value: '2', id: '2-stars', title: 'badly' },
  { value: '1', id: '1-star', title: 'terribly' },
];

export enum SORTING_OPTIONS {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const OPTIONS = Object.values(SORTING_OPTIONS);
