import CitiesOffersList from '@/components/cities-offers-list/cities-offers-list.tsx';
import Header from '@/widgets/header/header.tsx';
import { Offer } from '@/types/offer.ts';
import { city } from '@/mocks/city.ts';
import { Link } from 'react-router-dom';

type MainPageProps = { offers: Offer[] };

export default function MainPage({ offers }: MainPageProps) {
  return (
    <div className="page page--gray page--main">
      <Header shouldShowNav />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <Link className="locations__item-link tabs__item tabs__item--active" to="#">
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <CitiesOffersList city={city} offers={offers} />
      </main>
    </div>
  );
}
