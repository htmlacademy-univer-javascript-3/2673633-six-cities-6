import CitiesOffersList from '@/components/cities-offers-list/cities-offers-list.tsx';
import Header from '@/widgets/header/header.tsx';
import { useAppSelector } from '@/hooks/use-app-selector/use-app-selector.ts';
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
        {offers.length === 0 ? (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        ) : (
          <CitiesOffersList city={currentCity} offers={currentOffers} />
        )}
      </main>
    </div>
  );
});

MainPage.displayName = 'MainPage';

export default MainPage;
