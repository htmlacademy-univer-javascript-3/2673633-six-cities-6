import React from 'react';
import MainPage from '@/pages/main-page/main-page.tsx';

export default function App({ offersCount }: { offersCount: number }) {
  return (
    <React.StrictMode>
      <MainPage offersCount={offersCount} />
    </React.StrictMode>
  );
}
