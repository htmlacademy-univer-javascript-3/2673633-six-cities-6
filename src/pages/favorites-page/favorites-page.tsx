import FavoritesOffersList from '@/components/favorites-offers-list/favorites-offers-list.tsx';
import Header from '@/widgets/header/header.tsx';
import Footer from '@/widgets/footer/footer.tsx';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import { memo } from 'react';

const FavoritesPage = memo(() => {
  const offers = useAppSelector((state) => state.user.favoriteOffers);

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
      <Footer />
    </div>
  );
});

FavoritesPage.displayName = 'FavoritesPage';

export default FavoritesPage;
