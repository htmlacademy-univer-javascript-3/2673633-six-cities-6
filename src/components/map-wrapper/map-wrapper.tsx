import Map from '@/components/map/map.tsx';
import { City } from '@/types/city.ts';
import { Offer } from '@/types/offer.ts';
import { Point } from '@/types/point.ts';

type MapWrapperProps = {
  type: 'offer' | 'cities';
  city: City;
  offers: Offer[];
  selectedOffer?: Offer | null;
};

export default function MapWrapper({ type, city, offers, selectedOffer }: MapWrapperProps) {
  const points: Point[] = offers.map((offer: Offer) => ({
    id: offer.id,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point | undefined = selectedOffer
    ? {
      id: selectedOffer.id,
      lat: selectedOffer.location.latitude,
      lng: selectedOffer.location.longitude,
    }
    : undefined;

  return <Map type={type} city={city} points={points} selectedPoint={selectedPoint} key={city.name} />;
}
