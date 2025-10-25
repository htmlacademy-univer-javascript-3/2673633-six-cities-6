import { Offer } from '@/types/offer.ts'
import Card from '@/components/card/card.tsx'
import { useState } from 'react'
import FilterForm from '@/components/filter-form/filter-form.tsx'

type CitiesOffersListProps = {
  offers: Offer[];
}

export default function CitiesOffersList({ offers }: CitiesOffersListProps) {
  const [, setActiveCardId] = useState<string | null>(null)

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
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  )
}
