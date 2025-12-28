import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '@/pages/main-page/main-page.tsx';
import LoginPage from '@/pages/login-page/login-page.tsx';
import OfferPage from '@/pages/offer-page/offer-page.tsx';
import NotFoundPage from '@/pages/not-found-page/not-found-page.tsx';
import FavoritesPage from '@/pages/favorites-page/favorites-page.tsx';
import PrivateRoute from '@/components/private-route/private-route.tsx';
import { PATHS } from '@/constants/paths/paths.ts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.Main} element={<MainPage />} />
        <Route path={PATHS.Login} element={<LoginPage />} />
        <Route
          path={PATHS.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={PATHS.Offer} element={<OfferPage />} />
        <Route path={PATHS.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
