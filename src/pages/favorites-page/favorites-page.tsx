import Header from '@/widgets/header/header.tsx';
import { Offer } from '@/types/offer.ts';
import FavoritesOffersList from '@/components/favorites-offers-list/favorites-offers-list.tsx';

type FavoritesPageProps = {
  offers: Offer[];
};

export default function FavoritesPage({ offers }: FavoritesPageProps) {
  return (
    <div className="page">
      <Header shouldShowNav />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesOffersList offers={offers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
