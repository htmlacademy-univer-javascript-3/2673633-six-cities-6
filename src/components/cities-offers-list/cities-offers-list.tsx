import { Offer } from '@/types/offer.ts';
import { City } from '@/types/city.ts';
import { useState, useMemo, useCallback } from 'react';
import Card from '@/components/card/card.tsx';
import FilterForm from '@/components/filter-form/filter-form.tsx';
import MapWrapper from '@/components/map-wrapper/map-wrapper.tsx';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import { sort } from '@/utils/sorting.ts';

type CitiesOffersListProps = {
  city: City;
  offers: Offer[];
};

export default function CitiesOffersList({ city, offers }: CitiesOffersListProps) {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const currentSorting = useAppSelector((state) => state.offers.sorting);

  const sortedOffers = useMemo(
    () => sort(offers).by(currentSorting),
    [offers, currentSorting]
  );

  const handleMouseEnter = useCallback((offer: Offer) => {
    setActiveCard(offer);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  const placesCount = useMemo(() => `${offers.length} places to stay in ${city.name}`, [offers.length, city.name]);

  const offersList = useMemo(
    () =>
      sortedOffers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          type="cities"
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      )),
    [sortedOffers, handleMouseEnter, handleMouseLeave]
  );

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{placesCount}</b>
          <FilterForm />
          <div className="cities__places-list places__list tabs__content">
            {offersList}
          </div>
        </section>
        <div className="cities__right-section">
          <MapWrapper type={'cities'} city={city} offers={offers} selectedOffer={activeCard} />
        </div>
      </div>
    </div>
  );
}
