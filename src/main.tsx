import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// La clave viene de Vercel. Si es invalida, ClerkProvider 
// igual renderiza los hijos sin crashar
const KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={KEY} afterSignOutUrl="/">
      <HashRouter>
        <App />
      </HashRouter>
    </ClerkProvider>
  </StrictMode>
);
