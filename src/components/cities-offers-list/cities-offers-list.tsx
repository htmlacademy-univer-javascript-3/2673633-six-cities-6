import { Offer } from '@/types/offer.ts';
import { Point } from '@/types/point';
import { City } from '@/types/city.ts';
import { useState } from 'react';
import Card from '@/components/card/card.tsx';
import FilterForm from '@/components/filter-form/filter-form.tsx';
import Map from '@/components/map/map.tsx';


type CitiesOffersListProps = {
  offers: Offer[];
};

export default function CitiesOffersList({ offers }: CitiesOffersListProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const points: Point[] = offers.map((offer: Offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedOffer = offers.find((item) => item.id === activeCardId);

  const point: Point | undefined = activeCardId && selectedOffer
    ? {
      title: selectedOffer.title,
      lat: selectedOffer.location.latitude,
      lng: selectedOffer.location.longitude,
    }
    : undefined;

  const city: City = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
          <FilterForm />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer: Offer) => (
              <Card
                key={offer.id}
                offer={offer}
                type="cities"
                onMouseEnter={() => setActiveCardId(offer.id)}
                onMouseLeave={() => setActiveCardId(null)}
              />
            ))}
          </div>
        </section>
        <Map city={city} points={points} selectedPoint={point} />
      </div>
    </div>
  );
}
