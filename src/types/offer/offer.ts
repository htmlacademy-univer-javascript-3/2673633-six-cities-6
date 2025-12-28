import { GeoLocation } from '@/types/geolocation/geolocation.ts';
import { City } from '@/types/city/city.ts';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: GeoLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
