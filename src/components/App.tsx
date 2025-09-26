import React from 'react';
import Main from './Main';

export default function App({ offersCount }: { offersCount: number }) {
  return (
    <React.StrictMode>
      <Main offersCount={offersCount} />
    </React.StrictMode>
  );
}
