import Map from '@/components/map/map.tsx';
import { City } from '@/types/city/city.ts';
import { Offer } from '@/types/offer/offer.ts';
import { Point } from '@/types/point/point.ts';
import { ExpandedOffer } from '@/types/expanded-offer/expanded-offer.ts';
import { Map as MapType } from '@/types/map/map.ts';

type MapWrapperProps = {
  type: MapType;
  city: City;
  offers: (ExpandedOffer | Offer)[];
  selectedOffer?: ExpandedOffer | Offer | null;
};

export default function MapWrapper({ type, city, offers, selectedOffer }: MapWrapperProps) {
  const points: Point[] = offers.map((offer: Offer | ExpandedOffer) => ({
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
