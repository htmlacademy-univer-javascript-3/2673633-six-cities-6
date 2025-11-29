import CitiesOffersList from '@/components/cities-offers-list/cities-offers-list.tsx';
import Header from '@/widgets/header/header.tsx';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import CitiesTabs from '@/components/cities-tabs/cities-tabs.tsx';

export default function MainPage() {
  const offers = useAppSelector((state) => state.offers);
  const cities = Array.from(
    new Map(offers.map((offer) => [offer.city.name, offer.city])).values(),
  );
  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  return (
    <div className="page page--gray page--main">
      <Header shouldShowNav />
      <main className="page__main page__main--index">
        <CitiesTabs cities={cities} currentCity={currentCity} />
        <CitiesOffersList city={currentCity} offers={currentOffers} />
      </main>
    </div>
  );
}
