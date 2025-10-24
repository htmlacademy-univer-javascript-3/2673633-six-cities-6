import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app.tsx'

import { offers } from '@/mocks/offers.tsx'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>,
)
