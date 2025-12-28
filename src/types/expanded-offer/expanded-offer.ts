import { City } from '@/types/city/city.ts';
import { GeoLocation } from '@/types/geolocation/geolocation.ts';

export type ExpandedOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  images: string[];
  city: City;
  location: GeoLocation;
  description: string;
  goods: string[];
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};
