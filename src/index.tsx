import ReactDOM from 'react-dom/client';
import App from './components/app.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App offersCount={15}/>
);
