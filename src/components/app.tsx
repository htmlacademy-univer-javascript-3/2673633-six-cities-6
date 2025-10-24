import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainPage from '@/pages/main-page/main-page.tsx'
import LoginPage from '@/pages/login-page/login-page.tsx'
import OfferPage from '@/pages/offer-page/offer-page.tsx'
import NotFoundPage from '@/pages/not-found-page/not-found-page.tsx'
import FavoritesPage from '@/pages/favorites-page/favorites-page.tsx'
import PrivateRoute from '@/components/private-route.tsx'
import { Offer } from '@/mocks/offers.tsx'

type AppProps = { offers: Offer[] }

export default function App({ offers }: AppProps) {
  const isAuthorized = false

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
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
  )
}
