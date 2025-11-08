import { Offer } from '@/types/offer.ts';
import { City } from '@/types/city.ts';
import { useState } from 'react';
import Card from '@/components/card/card.tsx';
import FilterForm from '@/components/filter-form/filter-form.tsx';
import MapWrapper from '@/components/map-wrapper/map-wrapper.tsx';

type CitiesOffersListProps = {
  city: City;
  offers: Offer[];
};

export default function CitiesOffersList({ city, offers }: CitiesOffersListProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const selectedOffer = offers.find((item) => item.id === activeCardId);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
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
        <div className="cities__right-section">
          <MapWrapper type={'cities'} city={city} offers={offers} selectedOffer={selectedOffer} />
        </div>
      </div>
    </div>
  );
}
