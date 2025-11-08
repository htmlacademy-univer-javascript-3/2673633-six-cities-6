import { Offer } from '@/types/offer.ts';
import Card from '@/components/card/card.tsx';

export default function NearbyOffersList({ offers }: { offers: Offer[] }) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (
            <Card key={offer.id} offer={offer} type={'near-places'} />
          ))};
        </div>
      </section>
    </div>
  );
}
