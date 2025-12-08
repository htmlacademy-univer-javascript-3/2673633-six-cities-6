import CitiesOffersList from '@/components/cities-offers-list/cities-offers-list.tsx';
import Header from '@/widgets/header/header.tsx';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import CitiesTabs from '@/components/cities-tabs/cities-tabs.tsx';
import Spinner from '@/components/spinner/spinner.tsx';
import { memo, useMemo } from 'react';

const MainPage = memo(() => {
  const offers = useAppSelector((state) => state.offers.offers);
  const currentCity = useAppSelector((state) => state.offers.city);
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);

  const cities = useMemo(
    () => Array.from(new Map(offers.map((offer) => [offer.city.name, offer.city])).values()),
    [offers],
  );

  const currentOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === currentCity.name),
    [offers, currentCity.name],
  );

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header shouldShowNav />
      <main className="page__main page__main--index">
        <CitiesTabs cities={cities} currentCity={currentCity} />
        <CitiesOffersList city={currentCity} offers={currentOffers} />
      </main>
    </div>
  );
});

MainPage.displayName = 'MainPage';

export default MainPage;
