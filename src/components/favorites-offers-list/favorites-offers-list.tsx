import { Offer } from '@/types/offer.ts';
import Card from '@/components/card/card.tsx';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

type FavoritesOffersListProps = {
  offers: Offer[];
};

export default function FavoritesOffersList({ offers }: FavoritesOffersListProps) {
  const groupedOffers = useMemo(
    () =>
      offers.reduce(
        (acc, offer) => {
          if (!acc[offer.city.name]) {
            acc[offer.city.name] = [];
          }
          acc[offer.city.name].push(offer);
          return acc;
        },
        {} as Record<string, Offer[]>,
      ),
    [offers],
  );

  const cities = useMemo(() => Object.keys(groupedOffers), [groupedOffers]);

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {groupedOffers[city].map((offer: Offer) => (
              <Card key={offer.id} offer={offer} type="favorites" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
