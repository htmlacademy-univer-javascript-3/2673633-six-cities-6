import { Offer } from '@/types/offer.ts';
import Card from '@/components/card/card.tsx';

type NearOffersListProps = {
  offers: Offer[];
}

export default function NearOffersList({ offers }: NearOffersListProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              offer={offer}
              type={'near-places'}
            />
          ))};
        </div>
      </section>
    </div>
  );
}
