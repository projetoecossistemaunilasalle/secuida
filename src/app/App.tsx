import { BrowserRouter } from 'react-router-dom';
import { Providers } from './providers';
import { Router } from './router';

export default function App() {
  return (
    <Providers>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Router />
      </BrowserRouter>
    </Providers>
  );
}

