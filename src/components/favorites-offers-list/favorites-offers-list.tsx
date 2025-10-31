import { Offer } from '@/types/offer.ts';
import Card from '@/components/card/card.tsx';
import { Link } from 'react-router-dom';

type FavoritesOffersListProps = {
  offers: Offer[];
};

const getGroupedOffers = (offers: Offer[]) =>
  offers.reduce(
    (acc, offer) => {
      if (!acc[offer.city.name]) {
        acc[offer.city.name] = [];
      }
      acc[offer.city.name].push(offer);
      return acc;
    },
    {} as Record<string, Offer[]>,
  );

export default function FavoritesOffersList({ offers }: FavoritesOffersListProps) {
  const groupedOffers = getGroupedOffers(offers);

  return (
    <ul className="favorites__list">
      {Object.keys(groupedOffers).map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer: Offer) => (
              <Card key={offer.id} offer={offer} type="favorites" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
