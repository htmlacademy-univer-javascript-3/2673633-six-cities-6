import { Review } from '@/types/review.ts';

export const reviews: Review[] = [
  {
    id: '02afe78f-ac84-4f17-a19d-0e941a05d004',
    comment: 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    date: '2025-10-17T21:00:00.206Z',
    rating: 1,
    user: {
      name: 'Aron',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/4.jpg',
      isPro: false,
    },
  },
  {
    id: '3b676de8-8b47-40c9-8556-2956a8c2a345',
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2025-11-16T21:00:00.206Z',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/2.jpg',
      isPro: true,
    },
  },
];
