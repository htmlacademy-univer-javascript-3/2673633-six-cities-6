export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const TIMEOUT = 5000;

export const PASSWORD_REGEX = /(?=.*\p{L})(?=.*\d)/u;

export const REVIEW_MIN_LENGTH = 50;

export const RATINGS = [
  { value: '5', id: '5-stars', title: 'perfect' },
  { value: '4', id: '4-stars', title: 'good' },
  { value: '3', id: '3-stars', title: 'not bad' },
  { value: '2', id: '2-stars', title: 'badly' },
  { value: '1', id: '1-star', title: 'terribly' },
];

export const DEFAULT_CITY = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
};

export enum SORTING_OPTIONS {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum PATHS {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}
