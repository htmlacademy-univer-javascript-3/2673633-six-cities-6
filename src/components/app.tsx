import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '@/pages/main-page/main-page.tsx';
import LoginPage from '@/pages/login-page/login-page.tsx';
import OfferPage from '@/pages/offer-page/offer-page.tsx';
import NotFoundPage from '@/pages/not-found-page/not-found-page.tsx';
import FavoritesPage from '@/pages/favorites-page/favorites-page.tsx';
import PrivateRoute from '@/components/private-route.tsx';

export default function App({ offersCount }: { offersCount: number }) {
  const isAuthorized = false;

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage offersCount={offersCount} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute isAuthorized={isAuthorized}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
