import { Offer } from '@/types/offer.ts';

export const offers: Offer[] = [
  {
    'id': '04e82bbd-e3d6-4039-bdca-6d269625274f',
    'title': 'Tile House',
    'type': 'room',
    'price': 105,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13,
      },
    },
    'location': {
      'latitude': 48.858610000000006,
      'longitude': 2.330499,
      'zoom': 16,
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.3,
  },
  {
    'id': '4ac4b1fa-108c-47eb-a4c7-9b633f95699b',
    'title': 'Tile House',
    'type': 'hotel',
    'price': 464,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13,
      },
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.335499,
      'zoom': 16,
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 1.3,
  },
  {
    'id': 'c62efd89-8b16-4595-8bf2-558dc390ae4b',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'apartment',
    'price': 320,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13,
      },
    },
    'location': {
      'latitude': 48.85761,
      'longitude': 2.358499,
      'zoom': 16,
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 2.6,
  },
];
